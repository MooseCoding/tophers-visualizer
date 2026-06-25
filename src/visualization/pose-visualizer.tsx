'use client';

import { useEffect, useRef } from "react";

interface PoseDrawProps {
  poses: Pose[];
}

export default function DrawPoses({ poses }: PoseDrawProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const scale = 3;

    ctx.beginPath();
    poses.forEach((pose, index) => {
      const x = centerX + (Number(pose.x) || 0) * scale;
      const y = centerY - (Number(pose.y) || 0) * scale; // Invert Y because canvas 0,0 is top-left

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]); // Dashed path line
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 2. Draw each individual pose node
    poses.forEach((pose) => {
      const posX = centerX + (Number(pose.x) || 0) * scale;
      const posY = centerY - (Number(pose.y) || 0) * scale;
      const headingDeg = Number(pose.heading) || 0;

      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate((-headingDeg * Math.PI) / 180); // Canvas rotates clockwise, invert heading if counter-clockwise standard

      // Draw the radius circle if Arc Pose is active
      if (pose.arcPose && pose.radius) {
        ctx.beginPath();
        ctx.arc(0, 0, Number(pose.radius) * scale, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(239, 68, 68, 0.2)"; // Muted red border
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw the center pose node core
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, 2 * Math.PI);
      ctx.fillStyle = pose.local ? "#dc2626" : "#2563eb"; // Red vs Blue
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Heading pointer line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(12, 0);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    });
  }, [poses]);

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="max-w-full max-h-full bg-zinc-950"
      />
    </div>
  )
}