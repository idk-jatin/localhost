import { useEffect, useState } from "react";
import {
  getFakePing,
  getFakeWifiBars,
  getFakeCPU,
  getFakeMemory,
} from "../../utils/ui/fakeStats";

import CpuIcon from "./icons/CpuIcon";
import MemIcon from "./icons/MemIcon";

const wifi_bars = "▂▄▆█";

export default function SystemFooter() {
  const [ping, setPing] = useState(getFakePing());
  const [wifi, setWifi] = useState(getFakeWifiBars());
  const [cpu, setCpu] = useState(getFakeCPU());
  const [mem, setMem] = useState(getFakeMemory());

  // False network information fetching and repainting in 4sec
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(getFakePing());
      setWifi(getFakeWifiBars());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // False device information fetching and repainting in 3sec
  useEffect(() => {
    const stats = setInterval(() => {
      setCpu(getFakeCPU());
      setMem(getFakeMemory());
    }, 3000);

    return () => clearInterval(stats);
  }, []);

  const wifiLevel = Math.min(wifi, wifi_bars.length);

  const wifiColor =
    wifi < 2 ? "text-error" : wifi < 3 ? "text-warning" : "text-terminal";

  return (
    <div
      className="
        w-full h-8
        flex items-center justify-between
        px-3 sm:px-4
        bg-bg
        border-t border-borderGreen
        font-mono
        text-[10px] sm:text-xs
        select-none
      "
    >
      {/* Ping and wifi false info */}
      <div className="flex items-center gap-2 sm:gap-4 text-terminalMuted">
        <span>ping [{ping}ms]</span>

        <span className={`flex items-center gap-1 ${wifiColor}`}>
          wifi {wifi_bars.slice(0, wifiLevel)}
        </span>
      </div>
      {/* Cpu and memory false info */}
      <div className=" flex items-center gap-2 sm:gap-4 text-terminalMuted">
        <div className="flex items-center gap-1">
          <CpuIcon />
          <span>CPU [{cpu}%]</span>
        </div>

        <div className="flex items-center gap-1">
          <MemIcon />
          <span>MEM [{mem}%]</span>
        </div>
      </div>
    </div>
  );
}
