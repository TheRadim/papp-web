import type { CSSProperties } from "react";

const balls = Array.from({ length: 50 }, (_, index) => {
  const seed = (index * 37) % 101;
  const colors = [
    "rgba(0, 126, 181, 0.2)",
    "rgba(71, 178, 228, 0.18)",
    "rgba(251, 134, 127, 0.2)",
    "rgba(255, 255, 255, 0.58)"
  ];

  return {
    color: colors[index % colors.length],
    delay: `${(index % 11) * -0.37}s`,
    duration: `${2.6 + (index % 9) * 0.36}s`,
    left: `${(seed * 17) % 100}%`,
    size: `${0.35 + (index % 7) * 0.18}rem`,
    top: `${(seed * 29) % 100}%`,
    x: `${(index % 2 === 0 ? -1 : 1) * (3 + (index % 9))}rem`,
    y: `${2 + (index % 10)}rem`
  };
});

export function ContactFloatingBalls() {
  return (
    <div className="contact-floating-balls" aria-hidden="true">
      {balls.map((ball, index) => (
        <span
          className="contact-floating-balls__ball"
          key={`${ball.left}-${ball.top}-${index}`}
          style={{
            "--ball-color": ball.color,
            "--ball-delay": ball.delay,
            "--ball-duration": ball.duration,
            "--ball-left": ball.left,
            "--ball-size": ball.size,
            "--ball-top": ball.top,
            "--ball-x": ball.x,
            "--ball-y": ball.y
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
