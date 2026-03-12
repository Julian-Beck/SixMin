import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ─── Config ────────────────────────────────────────────────────────────────────

const COLOR_POOL = [
  'white',    'white',   'white',   'white',   'white',  // 5 — most common
  'blue',     'blue',    'blue',    'blue',               // 4
  'yellow',   'yellow',  'yellow',                        // 3
  'purple',   'purple',                                   // 2
  'rainbow',                                              // 1 — rarest
];

type colorStyle = {
    bg: string, 
    border: string,
    label: string,
}

const COLOR_STYLES = {
  white:   { bg: '#FFFFFF', border: '#CCCCCC', label: '' },
  blue:    { bg: '#4A90D9', border: '#2C6FAC', label: '' },
  yellow:  { bg: '#F5C842', border: '#C9A020', label: '' },
  purple:  { bg: '#9B59B6', border: '#6C3483', label: '' },
  rainbow: { bg: '#000000', border: '#FF4ECD', label: '🌈' },
};

const REEL_COUNT = 3;
const SPIN_DURATION = 4000;

// ─── Helpers ───────────────────────────────────────────────────────────────────

const randomColor = () => COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];

const checkWin = (reels: string[]) => reels.every((c) => c === reels[0]);

// ─── Reel Component ────────────────────────────────────────────────────────────

type ReelProps = {
    color: string,
    spinning: boolean,
}

function Reel({ color, spinning }: ReelProps) {
  const shake = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef<Animated.CompositeAnimation | null>(null);
  const colorInterval = useRef<number>(0);
  const [displayColor, setDisplayColor] = useState<string>(color);

  // Shake animation
  useEffect(() => {
    if (spinning) {
      shakeAnim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(shake, { toValue: 9, duration: 150, useNativeDriver: true, easing: Easing.sin }),
          Animated.timing(shake, { toValue: -9, duration: 150, useNativeDriver: true, easing: Easing.sin }),
        ])
      );
      shakeAnim.current.start();
    } else {
      if (shakeAnim.current) shakeAnim.current.stop();
      Animated.timing(shake, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    }

    return () => {
      if (shakeAnim.current) shakeAnim.current.stop();
    };
  }, [spinning]);

  // Color cycling during spin
  useEffect(() => {
    if (spinning) {
      colorInterval.current = setInterval(() => {
        setDisplayColor(randomColor());
      }, 1000); // cycle every 100ms
    } else {
      clearInterval(colorInterval.current);
      setDisplayColor(color); // snap to final result
    }

    return () => clearInterval(colorInterval.current);
  }, [spinning, color]);

  type SlotColor = keyof typeof COLOR_STYLES;
  const style: colorStyle = COLOR_STYLES[displayColor as SlotColor];
  const isRainbow = displayColor === 'rainbow';

  return (
    <Animated.View
      style={[
        styles.reel,
        {
          backgroundColor: isRainbow ? 'transparent' : style.bg,
          borderColor: style.border,
          transform: [{ translateY: shake }],
        },
        isRainbow && styles.rainbowReel,
      ]}
    >
      <Text style={[styles.reelLabel, displayColor === 'white' && { color: '#555' }]}>
        {style.label}
      </Text>
    </Animated.View>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SlotMachine() {
  const [reels, setReels] = useState(['white', 'white', 'white']);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(''); // null | 'win' | 'lose'
  const [spinCount, setSpinCount] = useState(0);
  const [wins, setWins] = useState(0);

  const resultScale = useRef(new Animated.Value(0)).current;

  const showResult = (won: boolean) => {
    resultScale.setValue(0);
    Animated.spring(resultScale, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
    setResult(won ? 'win' : 'lose');
  };

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult('');
    setSpinCount((c) => c + 1);

    // Stagger each reel stopping for suspense
    const newReels = [randomColor(), randomColor(), randomColor()];

    setTimeout(() => {
      setReels((prev) => [newReels[0], prev[1], prev[2]]);
    }, SPIN_DURATION * 0.7);

    setTimeout(() => {
      setReels((prev) => [prev[0], newReels[1], prev[2]]);
    }, SPIN_DURATION * 0.85);

    setTimeout(() => {
      setReels(newReels);
      setSpinning(false);
      const won = checkWin(newReels);
      if (won) setWins((w) => w + 1);
      showResult(won);
    }, SPIN_DURATION);
  };

  const isRainbowWin = result === 'win' && reels[0] === 'rainbow';

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🎰 SLOTS</Text>
      <Text style={styles.subtitle}>Match all 3 to win</Text>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.stat}>Spins: {spinCount}</Text>
        <Text style={styles.stat}>Wins: {wins}</Text>
      </View>

      {/* Reels */}
      <View style={styles.reelsRow}>
        {reels.map((color, i) => (
          <Reel key={i} color={color} spinning={spinning} />
        ))}
      </View>

      {/* Result banner */}
      {result != '' && (
        <Animated.View
          style={[
            styles.resultBanner,
            result === 'win' ? styles.winBanner : styles.loseBanner,
            { transform: [{ scale: resultScale }] },
            isRainbowWin && styles.rainbowBanner,
          ]}
        >
          <Text style={styles.resultText}>
            {result === 'win'
              ? isRainbowWin
                ? '🌈 RAINBOW WIN!!! 🌈'
                : '🎉 YOU WIN!'
              : 'Try again...'}
          </Text>
        </Animated.View>
      )}

      {/* Spin Button */}
      <TouchableOpacity
        style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
        onPress={handleSpin}
        activeOpacity={0.8}
        disabled={spinning}
      >
        <Text style={styles.spinButtonText}>{spinning ? 'Spinning...' : 'SPIN'}</Text>
      </TouchableOpacity>

      {/* Odds legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Rarity</Text>
        {Object.entries(COLOR_STYLES).map(([key, val]) => (
          <View key={key} style={styles.legendRow}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: val.bg ?? '#FF4ECD', borderColor: val.border },
                key === 'rainbow' && styles.rainbowDot,
              ]}
            />
            <Text style={styles.legendLabel}>{val.label}</Text>
            <Text style={styles.legendOdds}>
              {key === 'white' && '~3.7%'}
              {key === 'blue' && '~1.9%'}
              {key === 'yellow' && '~0.8%'}
              {key === 'purple' && '~0.3%'}
              {key === 'rainbow' && '~0.03%'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
    letterSpacing: 1,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  stat: {
    color: '#aaa',
    fontSize: 14,
  },
  reelsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  reel: {
    width: 90,
    height: 90,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  rainbowReel: {
    borderWidth: 3,
    borderColor: '#FF4ECD',
    backgroundColor: '#2a1a3e',
  },
  reelLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  resultBanner: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 24,
  },
  winBanner: {
    backgroundColor: '#FFD700',
  },
  loseBanner: {
    backgroundColor: '#333',
  },
  rainbowBanner: {
    backgroundColor: '#FF4ECD',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 1,
  },
  spinButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 50,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  spinButtonDisabled: {
    backgroundColor: '#555',
    shadowOpacity: 0,
  },
  spinButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a2e',
    letterSpacing: 3,
  },
  legend: {
    marginTop: 36,
    width: '100%',
    backgroundColor: '#ffffff0f',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  legendTitle: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  rainbowDot: {
    backgroundColor: '#FF4ECD',
  },
  legendLabel: {
    color: '#ccc',
    fontSize: 13,
    flex: 1,
  },
  legendOdds: {
    color: '#666',
    fontSize: 12,
  },
});