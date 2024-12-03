import React, { useState, useEffect } from 'react';
import { Phone, Mic, MicOff, Volume2, X } from 'lucide-react';

interface VoiceCallInterfaceProps {
  onStartCall: () => Promise<void>;
  onEndCall: () => Promise<void>;
  onMuteToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export function VoiceCallInterface({
  onStartCall,
  onEndCall,
  onMuteToggle,
  onVolumeChange
}: VoiceCallInterfaceProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    try {
      await onStartCall();
      setIsCallActive(true);
      setError(null);
    } catch (err) {
      setError('Failed to start call');
    }
  };

  const handleEndCall = async () => {
    try {
      await onEndCall();
      setIsCallActive(false);
      setDuration(0);
      setError(null);
    } catch (err) {
      setError('Failed to end call');
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onMuteToggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Voice Call</h2>
          </div>
          {isCallActive && (
            <span className="text-sm font-medium text-gray-500">
              {formatDuration(duration)}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Call Status */}
          <div className="text-center">
            {isCallActive ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Call in Progress
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Ready to Call
              </span>
            )}
          </div>

          {/* Call Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleMuteToggle}
              className={`p-3 rounded-full ${
                isMuted
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={isCallActive ? handleEndCall : handleStartCall}
              className={`p-4 rounded-full ${
                isCallActive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isCallActive ? (
                <X className="w-8 h-8" />
              ) : (
                <Phone className="w-8 h-8" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <Volume2 className="w-6 h-6 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}