import React from 'react';
import svgPaths from '@/imports/svg-pio3277t6s';
import { imgGroup } from '@/imports/svg-rmbfu';

interface IconProps {
  className?: string;
}

export function SearchIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="magnifying-glass-m">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="magnifying-glass-m">
          <path clipRule="evenodd" d={svgPaths.p3eb0ff00} fill="currentColor" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

export function AnswerIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="answer">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_4040_2634_answer)" id="answer">
          <g id="Answer">
            <path d={svgPaths.p2fb59f80} fill="currentColor" id="Union" />
            <path d={svgPaths.p33834300} fill="currentColor" id="Union_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4040_2634_answer">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="cog-s">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="cog-l">
          <path clipRule="evenodd" d={svgPaths.p1afe1f00} fill="currentColor" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

export function ModelIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="save-worksheet-s">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="save-worksheet-l">
          <path clipRule="evenodd" d={svgPaths.p37cb4780} fill="currentColor" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

export function NavigateIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="arrow-right-s">
      <div className="absolute flex inset-0 items-center justify-center">
        {/* Original had rotations summing to 0 (90+270), simplified here to direct path */}
        <div className="flex-none size-full">
           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="arrow-right-l">
              <path d={svgPaths.p2b571500} fill="currentColor" id="Path" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="plus-s">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="plus-l">
          <g id="Path">
            <path d={svgPaths.p2e815400} fill="currentColor" />
            <path d={svgPaths.p15962580} fill="currentColor" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="information-s">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="information-l">
          <path clipRule="evenodd" d={svgPaths.p32761b00} fill="currentColor" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

// Complex Spotter Icon
function Group1() {
  return (
    <div className="absolute inset-[23.44%_9.4%_-141.32%_-203.47%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[28.485px_-3.281px] mask-size-[14px_14px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-0.8%_-0.59%_-2.25%_-0.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.595 31.4311">
          <g id="Group">
            <path d={svgPaths.p20352500} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p9ed4500} fill="var(--fill-0, #A5ACB9)" id="Vector_2" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <g id="Vector_3">
              <path d={svgPaths.p1c164c40} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1c164c40} stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            </g>
            <path d={svgPaths.p1381d400} fill="var(--fill-0, #A5ACB9)" id="Vector_4" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p2b2dbf80} fill="var(--fill-0, #A5ACB9)" id="Vector_5" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.363958" />
            <path d={svgPaths.p2914a900} fill="var(--fill-0, #A5ACB9)" id="Vector_6" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.363958" />
            <path d={svgPaths.p217fe100} fill="var(--fill-0, white)" id="Vector_7" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p3256b200} fill="var(--fill-0, #A5ACB9)" id="Vector_8" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.363958" />
            <path d={svgPaths.p13394400} fill="var(--fill-0, #A5ACB9)" id="Vector_9" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.363958" />
            <path d={svgPaths.p9686cf0} fill="var(--fill-0, #A5ACB9)" id="Vector_10" stroke="var(--stroke-0, #A5ACB9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.485278" />
            <path d={svgPaths.p2183c000} fill="var(--fill-0, #A5ACB9)" id="Vector_11" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p5ff5700} fill="var(--fill-0, #A5ACB9)" id="Vector_12" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <g id="Vector_13">
              <path d={svgPaths.p20247ed8} fill="var(--fill-0, white)" />
              <path d={svgPaths.p20247ed8} stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            </g>
            <path d={svgPaths.p3d82d480} fill="var(--fill-0, #A5ACB9)" id="Vector_14" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.545937" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[23.44%_9.4%_-141.32%_-203.47%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[335.99%_336.86%_-309.61%_-330.05%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[46.208px_-47.038px] mask-size-[14px_14px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-2.35%_-1.86%_-1.55%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2898 10.7104">
          <g id="Group">
            <path d={svgPaths.p3f596d80} id="Vector" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p37e6c200} fill="var(--fill-0, #A5ACB9)" id="Vector_2" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p11db3300} fill="var(--fill-0, #A5ACB9)" id="Vector_3" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.485278" />
            <path d={svgPaths.p1c690c00} fill="var(--fill-0, #A5ACB9)" id="Vector_4" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.545937" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[335.99%_336.86%_-309.61%_-330.05%]" data-name="Group">
      <Group3 />
    </div>
  );
}

export function SpotterIcon({ className }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className} overflow-hidden`} data-name="dog-chat-avatar">
      <div className="absolute inset-[314.28%_329.52%_-310.52%_-325.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[45.606px_-44px] mask-size-[14px_14px]" data-name="Vector" style={{ maskImage: `url('${imgGroup}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
      </div>
      <Group />
      <Group2 />
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[14px_14px]" data-name="Vector" style={{ maskImage: `url('${imgGroup}')` }}>
        <div className="absolute inset-0" style={{ "--stroke-0": "rgba(165, 172, 185, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p6894e00} id="Vector" stroke="var(--stroke-0, #A5ACB9)" strokeMiterlimit="10" strokeWidth="0.5625" />
          </svg>
        </div>
      </div>
    </div>
  );
}
