import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Music, ChevronUp, ChevronDown, Sliders } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const AmbientMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundManager.isMusicPlaying());
  const [volume, setVolume] = useState(soundManager.getMusicVolume());
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([40, 65, 30, 85, 50, 70, 90, 45]);

  useEffect(() => {
    const unsubscribe = soundManager.subscribeMusicState((playing) => {
      setIsPlaying(playing);
      if (playing) setHasInteracted(true);
    });
    return unsubscribe;
  }, []);

  // Animate visualizer bars when music is playing
  useEffect(() => {
    let animId: number;
    const updateVisualizer = () => {
      if (isPlaying) {
        const data = soundManager.getAnalyzerData();
        if (data.length > 0) {
          const bars = [
            Math.max(15, (data[2] || 60) * 0.4),
            Math.max(20, (data[4] || 120) * 0.45),
            Math.max(10, (data[6] || 80) * 0.35),
            Math.max(25, (data[8] || 160) * 0.5),
            Math.max(15, (data[10] || 90) * 0.4),
            Math.max(20, (data[12] || 140) * 0.45),
            Math.max(12, (data[14] || 70) * 0.38),
            Math.max(18, (data[16] || 110) * 0.42),
          ];
          setVisualizerBars(bars);
        }
      } else {
        setVisualizerBars([10, 15, 8, 12, 10, 14, 8, 10]);
      }
      animId = requestAnimationFrame(updateVisualizer);
    };

    animId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    soundManager.playWaterDrop();
    const playing = soundManager.toggleMusic();
    setIsPlaying(playing);
    setHasInteracted(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setMusicVolume(val);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none">
      {/* First-time prompt bubble if not started yet */}
      {!hasInteracted && !isPlaying && (
        <div
          onClick={handleTogglePlay}
          className="mb-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/90 via-sky-500/90 to-emerald-500/90 text-white text-xs font-medium shadow-[0_10px_25px_rgba(0,210,255,0.4)] backdrop-blur-xl border border-white/30 cursor-pointer animate-bounce flex items-center space-x-2"
        >
          <Music className="w-4 h-4 animate-spin" />
          <span>Toque para ativar Música Relaxante & Efeitos</span>
        </div>
      )}

      {/* Main Player Bar */}
      <div className="relative rounded-2xl bg-[#001026]/90 border border-white/15 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,10,30,0.8)] p-2.5 sm:p-3 flex items-center space-x-3 transition-all duration-300 hover:border-cyan-400/50">
        
        {/* Play/Pause Pulsing Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-tr from-cyan-400 via-sky-500 to-emerald-400 text-[#000a17] shadow-[0_0_20px_rgba(0,210,255,0.6)] scale-105'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isPlaying ? 'Pausar Música Ambiente' : 'Iniciar Música Ambiente'}
          aria-label="Controle de Música Ambiente"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Music Info & Visualizer */}
        <div className="flex flex-col pr-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span>MÚSICA AMBIENTE</span>
          </div>
          <span className="text-xs font-light text-white tracking-wide">
            {isPlaying ? 'Aquatic Spa Harmonics' : 'Música Pausada'}
          </span>
        </div>

        {/* Animated Soundwave Bars */}
        <div className="flex items-end space-x-1 h-6 px-1">
          {visualizerBars.map((height, idx) => (
            <span
              key={idx}
              className="w-1 rounded-full bg-gradient-to-t from-cyan-500 via-sky-300 to-emerald-400 transition-all duration-75"
              style={{
                height: `${Math.min(24, Math.max(4, height))}px`,
                opacity: isPlaying ? 0.9 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Ajustar Volume"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Controls Drawer (Volume slider + sound test) */}
      {isExpanded && (
        <div className="mt-2 w-64 p-3.5 rounded-2xl bg-[#001026]/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
            <span>VOLUME MÚSICA</span>
            <span className="text-cyan-300">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Efeitos da Água:</span>
            <button
              onClick={() => soundManager.playWaterDrop()}
              className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-cyan-300 font-mono transition-colors cursor-pointer"
            >
              💧 Testar Gota
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
