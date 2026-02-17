import svgPaths from "./svg-reay659j";
import imgEllipse from "figma:asset/7c976635b568ed8c300f6494f2ce90f4bb45a8aa.png";
import imgInitial from "figma:asset/3213ea60f007d43e1c083f092dbc5bfe4ab8c6d2.png";
import imgScreenshot20230301At7485 from "figma:asset/86065e75b4967716fc0c2a8dd934ffb72cecc14f.png";
import imgScreenshot20230301At7483 from "figma:asset/39ee68ff8b33626419b387293545e9d0d71540c8.png";
import imgScreenshot20230301At7484 from "figma:asset/d02689fcb06a46cd569929408bc17a7b6a58c9da.png";
import imgScreenshot20230301At7482 from "figma:asset/4843bfad3c56d10711c241c2b5f26d9c065f41fc.png";
import imgScreenshot20230301At7486 from "figma:asset/400f5b0292dda81ed3e14a9ac9de73cae3190489.png";
import imgUserAvatar from "figma:asset/ec44992216122aca011560222d493d90db5c7f01.png";
import imgAvatar from "figma:asset/61cc84b8f1f365c92a666803a6efe65ea48ea1c9.png";

function PaperPlaneM() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="paper-plane-m">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="paper-plane-l">
          <path clipRule="evenodd" d={svgPaths.p26bb1fc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#2770ef] content-stretch flex gap-[8px] items-center left-[916px] px-[16px] py-[6px] rounded-[16px] top-[8px]" data-name="Button">
      <PaperPlaneM />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px]">Ask Spotter</p>
      </div>
    </div>
  );
}

function ChevronDownM() {
  return (
    <div className="absolute left-[167px] size-[16px] top-[16px]" data-name="chevron-down-m">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down-l">
          <path clipRule="evenodd" d={svgPaths.p1b409d00} fill="var(--fill-0, #1D232F)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function SearchTextPlaceholderGray() {
  return (
    <div className="bg-white h-[20px] relative shrink-0 w-[296px]" data-name="Search text placeholder_Gray">
      <p className="absolute bottom-0 font-['Plain:Regular',sans-serif] leading-[20px] left-[4px] not-italic text-[#777e8b] text-[14px] top-0 w-[480px]">Ask a business question in natural language</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex items-center left-[217px] top-[15px]">
      <SearchTextPlaceholderGray />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents left-[19px] top-[8px]">
      <div className="absolute flex h-[24px] items-center justify-center left-[205px] top-1/2 translate-y-[-50%] w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[24px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 1">
                <line id="Line 1097" stroke="var(--stroke-0, #EAEDF2)" x2="24" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Button />
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[24px] left-[19px] not-italic text-[#1d232f] text-[16px] top-[12px] tracking-[-0.064px] w-[140px]">Retail-Apparel</p>
      <ChevronDownM />
      <Frame17 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-[48px] relative shrink-0 w-full">
      <div className="absolute flex h-[48px] items-center justify-center left-0 top-0 w-[1056px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[48px] relative w-[1056px]" data-name="Explore-panel-bg">
            <div className="absolute inset-[-4.17%_-0.19%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1060 52.0002">
                <g id="Explore-panel-bg">
                  <path d={svgPaths.p2dc4b380} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2dc4b380} stroke="var(--stroke-0, black)" strokeWidth="2" />
                  <path d={svgPaths.p2dc4b380} stroke="url(#paint0_linear_1_4731)" strokeWidth="2" />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_4731" x1="-61.619" x2="439.802" y1="45.6767" y2="-627.646">
                    <stop stopColor="#F46100" />
                    <stop offset="0.252403" stopColor="#B526EC" />
                    <stop offset="0.596023" stopColor="#58D7DB" />
                    <stop offset="0.965" stopColor="#0F0AF9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group22 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1056px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1d232f] text-[24px] tracking-[-0.096px] w-full">Spotter</p>
      <Frame18 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[110.104px]" data-name="Text">
      <p className="font-['Plain:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1d232f] text-[24px] text-nowrap tracking-[-0.096px]">Watchlist</p>
    </div>
  );
}

function PlusS() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="plus-s">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="plus-s">
          <g id="Path">
            <path d={svgPaths.p2e815400} fill="var(--fill-0, #2770EF)" />
            <path d={svgPaths.p15962580} fill="var(--fill-0, #2770EF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[4px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <PlusS />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2770ef] text-[14px] text-nowrap">
        <p className="leading-[20px]">Add to Watchlist</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <Button1 />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
      <Text />
      <Actions />
    </div>
  );
}

function Group33() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[300px]" data-name="Dropdown">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(246, 248, 250, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300 40">
            <path d={svgPaths.peafba80} fill="var(--fill-0, #F6F8FA)" id="Dropdown" />
          </svg>
        </div>
      </div>
      <p className="[grid-area:1_/_1] font-['Plain:Medium',sans-serif] leading-[20px] ml-[16px] mt-[10px] not-italic overflow-ellipsis overflow-hidden relative text-[#1d232f] text-[14px] text-nowrap">Top 3: TS Cloud WAU</p>
    </div>
  );
}

function ArrowDownL() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="arrow-down-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-down-l">
          <path d={svgPaths.p11470cf0} fill="var(--fill-0, #06BF7F)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownXs() {
  return (
    <div className="relative size-[12px]" data-name="arrow-down-xs">
      <ArrowDownL />
    </div>
  );
}

function Change() {
  return (
    <div className="bg-[#e0f8ef] content-stretch flex gap-[2px] items-center pl-[2px] pr-[4px] py-0 relative rounded-[4px] shrink-0" data-name="Change %">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ArrowDownXs />
        </div>
      </div>
      <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#06bf7f] text-[12px] text-nowrap tracking-[-0.072px]">
        <p className="leading-[18px]">6.9%</p>
      </div>
    </div>
  );
}

function Date() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Date">
      <div className="basis-0 flex flex-col font-['Plain:Regular',sans-serif] grow justify-end leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">
        <p className="leading-[18px] overflow-ellipsis overflow-hidden">vs week of 18/06/FY 2024 (65.4K)</p>
      </div>
    </div>
  );
}

function ComparisonLine() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Comparison line">
      <Change />
      <Date />
    </div>
  );
}

function Vector() {
  return (
    <div className="h-[50px] relative shrink-0 w-full">
      <div className="absolute inset-[17.86%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 268 41.0714">
          <path d={svgPaths.p102e2040} fill="var(--fill-0, #E0F8EF)" id="Vector 569" />
        </svg>
      </div>
      <div className="absolute inset-[17.86%_0_2.38%_0.17%]">
        <div className="absolute inset-[-2.3%_-0.15%_-2.49%_-0.04%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 268.061 41.7908">
            <path d={svgPaths.p342a4900} id="Vector 570" stroke="var(--stroke-0, #06BF7F)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <ComparisonLine />
      <Vector />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start justify-center left-[8px] px-[8px] py-0 top-0 w-[284px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8b] text-[14px] w-full">09/03/FY 2025</p>
      <p className="font-['Plain:Medium',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#1d232f] text-[32px] tracking-[-0.128px] w-full">$145.35M</p>
      <Frame35 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[164px] relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[35%_90.99%_35%_5%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0327 12.0005">
        <g id="Group 3189">
          <path d={svgPaths.pebf7800} fill="var(--fill-0, #777E8B)" id="Rectangle 147626" />
          <path d={svgPaths.p36e25c80} fill="var(--fill-0, #777E8B)" id="Rectangle 147625" />
          <path d={svgPaths.pef2400} fill="var(--fill-0, #777E8B)" id="Rectangle 147627" />
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute bottom-1/4 contents left-0 right-0 top-0">
      <div className="absolute bottom-1/4 left-[88.33%] right-[4.98%] top-1/4" data-name="Ellipse">
        <img alt="" className="block max-w-none size-full" height="20" src={imgEllipse} width="20.054" />
      </div>
      <Group12 />
      <div className="absolute bottom-full left-0 right-0 top-0">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300 1">
            <line id="Line 12" stroke="var(--stroke-0, #C0C6CF)" x2="300" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plain:Regular',sans-serif] inset-[30%_31.18%_30%_11.33%] justify-center leading-[0] not-italic text-[#1d232f] text-[12px] tracking-[-0.072px]">
        <p className="leading-[18px]">Cloud Clusters</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="h-[40px] relative shrink-0 w-[300px]">
      <Group32 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative rounded-[8px] shrink-0 w-[300px]">
      <div aria-hidden="true" className="absolute border border-[#c0c6cf] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <Group33 />
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[3px] top-[2px]">
      {[...Array(4).keys()].map((_, i) => (
        <Frame38 key={i} />
      ))}
    </div>
  );
}

function Card() {
  return (
    <div className="h-[265px] overflow-clip relative shrink-0 w-[1039px]" data-name="Card">
      <Frame40 />
      <div className="absolute bg-gradient-to-l from-[#ffffff] from-[6.41%] h-[262px] left-[calc(50%+504.5px)] to-[rgba(255,255,255,0)] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[38px]" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 top-0 w-[1056px]">
      <Header />
      <Card />
    </div>
  );
}

function ChevronRightM() {
  return (
    <div className="absolute inset-[20.83%]" data-name="chevron-right-m">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.8333">
        <g id="chevron-right-l">
          <path clipRule="evenodd" d={svgPaths.p2abca500} fill="var(--fill-0, #1D232F)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function IconButton() {
  return (
    <div className="absolute inset-[0_0_0.04px_0]" data-name="Icon button">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(234, 237, 242, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
          <ellipse cx="12" cy="11" fill="var(--fill-0, #EAEDF2)" id="Background" rx="12" ry="11" />
        </svg>
      </div>
      <ChevronRightM />
    </div>
  );
}

function IconButtton() {
  return (
    <div className="absolute inset-[54.97%_-1.52%_38.01%_99.24%]" data-name="Icon buttton">
      <IconButton />
    </div>
  );
}

function Frame39() {
  return (
    <div className="h-[314px] relative shrink-0 w-[1056px]">
      <Frame20 />
      <IconButtton />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[77px]" data-name="Text">
      <p className="font-['Plain:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1d232f] text-[24px] text-nowrap tracking-[-0.096px]">Library</p>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center min-w-[60px] px-[12px] py-0 relative shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#2770ef] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2770ef] text-[14px] text-center text-nowrap">All</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center min-w-[60px] px-[12px] py-0 relative shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#eaedf2] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-center text-nowrap">Yours</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Tab />
      <Tab1 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="bg-[#eaedf2] h-[24px] shrink-0 w-px" data-name="Divider" />
      <Frame41 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text1 />
      <Frame42 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2770ef] text-[14px] text-center text-nowrap">
        <p className="leading-[20px]">All Liveboards</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2770ef] text-[14px] text-center text-nowrap">
        <p className="leading-[20px]">All Answers</p>
      </div>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <Button2 />
      <div className="bg-[#eaedf2] h-[24px] shrink-0 w-px" data-name="Divider" />
      <Button3 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
      <Frame10 />
      <Actions1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute h-[16.527px] left-[17px] top-[580.48px] w-[16.872px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8721 16.5273">
        <g id="Group 3155">
          <path d={svgPaths.p265dec20} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute h-[8.766px] left-[26px] top-[579px] w-[8.633px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.63281 8.76562">
        <g id="Group 3158">
          <path d={svgPaths.p35e44fe0} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Answer() {
  return (
    <div className="absolute contents left-[17px] top-[579px]" data-name="Answer">
      <Group4 />
      <Group7 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute h-[16.527px] left-[17px] top-[108.48px] w-[16.872px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8721 16.5273">
        <g id="Group 3155">
          <path d={svgPaths.p265dec20} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute h-[8.766px] left-[26px] top-[107px] w-[8.633px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.63281 8.76562">
        <g id="Group 3158">
          <path d={svgPaths.p35e44fe0} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Answer1() {
  return (
    <div className="absolute contents left-[17px] top-[107px]" data-name="Answer">
      <Group5 />
      <Group8 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute h-[16.527px] left-[17px] top-[345.48px] w-[16.872px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8721 16.5273">
        <g id="Group 3155">
          <path d={svgPaths.p265dec20} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute h-[8.766px] left-[26px] top-[344px] w-[8.633px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.63281 8.76562">
        <g id="Group 3158">
          <path d={svgPaths.p35e44fe0} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Answer2() {
  return (
    <div className="absolute contents left-[17px] top-[344px]" data-name="Answer">
      <Group6 />
      <Group9 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute h-[16.527px] left-[17px] top-[424.48px] w-[16.872px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8721 16.5273">
        <g id="Group 3155">
          <path d={svgPaths.p265dec20} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute h-[8.766px] left-[26px] top-[423px] w-[8.633px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.63281 8.76562">
        <g id="Group 3158">
          <path d={svgPaths.p35e44fe0} fill="var(--fill-0, #777E8B)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Answer3() {
  return (
    <div className="absolute contents left-[17px] top-[423px]" data-name="Answer">
      <Group10 />
      <Group11 />
    </div>
  );
}

function Pinboard() {
  return (
    <div className="absolute h-[18px] left-[17px] top-[186px] w-[18.001px]" data-name="Pinboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0012 18">
        <g id="Pinboard">
          <path d={svgPaths.p3e2a6b00} fill="var(--fill-0, #777E8B)" id="Rectangle 147626" />
          <path d={svgPaths.p2c3fff80} fill="var(--fill-0, #777E8B)" id="Rectangle 147625" />
          <path d={svgPaths.p11310480} fill="var(--fill-0, #777E8B)" id="Rectangle 147627" />
        </g>
      </svg>
    </div>
  );
}

function Pinboard1() {
  return (
    <div className="absolute h-[18px] left-[17px] top-[265px] w-[18.001px]" data-name="Pinboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0012 18">
        <g id="Pinboard">
          <path d={svgPaths.p3e2a6b00} fill="var(--fill-0, #777E8B)" id="Rectangle 147626" />
          <path d={svgPaths.p2c3fff80} fill="var(--fill-0, #777E8B)" id="Rectangle 147625" />
          <path d={svgPaths.p11310480} fill="var(--fill-0, #777E8B)" id="Rectangle 147627" />
        </g>
      </svg>
    </div>
  );
}

function Pinboard2() {
  return (
    <div className="absolute h-[18px] left-[17px] top-[501px] w-[18.001px]" data-name="Pinboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0012 18">
        <g id="Pinboard">
          <path d={svgPaths.p3e2a6b00} fill="var(--fill-0, #777E8B)" id="Rectangle 147626" />
          <path d={svgPaths.p2c3fff80} fill="var(--fill-0, #777E8B)" id="Rectangle 147625" />
          <path d={svgPaths.p11310480} fill="var(--fill-0, #777E8B)" id="Rectangle 147627" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[1.27%_92.58%_94.49%_3.1%]">
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[1.27%_92.58%_94.49%_3.1%] justify-center leading-[0] not-italic text-[#777e8b] text-[14px] text-nowrap">
        <p className="leading-[20px]">Search</p>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="absolute contents inset-[1.27%_92.58%_94.49%_3.1%]" data-name="Search bar">
      <Group13 />
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Leading icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Leading icon">
          <path clipRule="evenodd" d={svgPaths.p3eb0ff00} fill="var(--fill-0, #1D232F)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[6px]" data-name="Text">
      <LeadingIcon />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777e8b] text-[14px] text-nowrap">
        <p className="leading-[20px]">Search</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="h-[32px] relative shrink-0 w-[247px]" data-name="Form">
      <div className="absolute h-[32px] left-0 right-0 top-0" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 247 32">
          <path d={svgPaths.p7461480} fill="var(--fill-0, white)" id="Background" stroke="var(--stroke-0, #C0C6CF)" />
        </svg>
      </div>
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap" data-name="Text">
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center relative shrink-0">
        <p className="leading-[20px] text-nowrap">Author</p>
      </div>
      <div className="flex flex-col font-['Plain:Medium',sans-serif] justify-center relative shrink-0">
        <p className="leading-[20px] text-nowrap">Anje Keizer</p>
      </div>
    </div>
  );
}

function TextIconOpt() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Text + Icon (opt)">
      <Text3 />
    </div>
  );
}

function ChipTriggerSingleFilterDefault() {
  return (
    <div className="bg-[#eaedf2] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[16px] shrink-0" data-name="Chip / Trigger / Single/Filter/Default">
      <TextIconOpt />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-0 top-0">
      <Form />
      <ChipTriggerSingleFilterDefault />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[64px] size-[18px] top-[502px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p18a07500} fill="var(--fill-0, #2770EF)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[64px] size-[18px] top-[52px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p18a07500} fill="var(--fill-0, #777E8B)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[64px] size-[18px] top-[186px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p18a07500} fill="var(--fill-0, #2770EF)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function VerifiedColumn() {
  return (
    <div className="absolute contents left-[52px] top-[45px]" data-name="Verified column">
      <div className="absolute flex inset-[9.53%_95.12%_83.69%_4.88%] items-center justify-center">
        <div className="flex-none h-px rotate-[270deg] w-[32px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 1">
                <line id="Line 282" stroke="var(--stroke-0, #EAEDF2)" x2="32" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[106px_989px_346px_70px] leading-[20px] not-italic text-[#777e8b] text-[14px] text-center text-nowrap">-</p>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[264px_989px_188px_70px] leading-[20px] not-italic text-[#777e8b] text-[14px] text-center text-nowrap">-</p>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[422px_989px_30px_70px] leading-[20px] not-italic text-[#777e8b] text-[14px] text-center text-nowrap">-</p>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[343px_989px_109px_70px] leading-[20px] not-italic text-[#777e8b] text-[14px] text-center text-nowrap">-</p>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[576px_989px_-124px_70px] leading-[20px] not-italic text-[#777e8b] text-[14px] text-center text-nowrap">-</p>
      <Icon />
      <Icon1 />
      <Icon2 />
    </div>
  );
}

function MeasuringLineDLeft() {
  return <div className="absolute h-[18.004px] left-[30px] top-[186px] w-[40px]" data-name="Measuring Line D ::  left" />;
}

function RedlinesAnswer() {
  return (
    <div className="absolute contents left-[30px] top-[186px]" data-name="Redlines ::  Answer">
      <MeasuringLineDLeft />
    </div>
  );
}

function ObjectTableRecentlyViewed() {
  return (
    <div className="absolute h-[472px] left-0 top-0 w-[1065px]" data-name="Object table - Recently Viewed">
      <div className="absolute inset-[83.05%_0.47%_0_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute inset-[66.31%_0.47%_16.74%_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] inset-[83.05%_0.47%_16.74%_0]" data-name="Rectangle" />
      <div className="absolute inset-[49.58%_0.47%_33.47%_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] inset-[66.31%_0.47%_33.47%_0]" data-name="Rectangle" />
      <div className="absolute inset-[32.84%_0.47%_50.21%_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] inset-[49.58%_0.47%_50.21%_0]" data-name="Rectangle" />
      <div className="absolute inset-[16.1%_0.47%_66.95%_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] inset-[32.84%_0.47%_66.95%_0]" data-name="Row divider" />
      <Answer1 />
      <Answer2 />
      <Answer3 />
      <Pinboard />
      <Pinboard1 />
      <Pinboard2 />
      <div className="absolute inset-[9.53%_0.47%_83.69%_0]" data-name="Column header background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1060 32">
          <path d="M0 0H1060V32H0V0Z" fill="var(--fill-0, #F6F8FA)" id="Column header background" />
        </svg>
      </div>
      <p className="absolute font-['Plain:Regular',sans-serif] inset-[11.02%_96.34%_85.17%_1.13%] leading-[18px] not-italic text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">Type</p>
      <div className="absolute bg-[#eaedf2] inset-[16.1%_0.47%_83.69%_0]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] inset-[9.53%_0.47%_90.25%_0]" data-name="Top keyline" />
      <SearchBar />
      <Frame12 />
      <VerifiedColumn />
      <div className="absolute bg-[#eaedf2] h-px left-0 top-[476px] w-[1060px]" data-name="Rectangle" />
      <div className="absolute bg-[#eaedf2] h-px left-0 top-[545px] w-[1060px]" data-name="Rectangle" />
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[116px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[195px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[274px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[353px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[432px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[511px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[1048px] not-italic text-[#2770ef] text-[14px] text-nowrap text-right top-[590px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px]">Share</p>
      </div>
      <RedlinesAnswer />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-white left-[13px] rounded-[4px] top-[60px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[5px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">Customer success</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white left-[13px] rounded-[4px] top-[231px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">Customer success</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white left-[129px] rounded-[4px] top-[231px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">+1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white left-[13px] rounded-[4px] top-[377px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">SpotApp</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-white left-[13px] rounded-[4px] top-[205px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">Marketing</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white left-[13px] rounded-[4px] top-[141px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">sales</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white left-[55px] rounded-[4px] top-[141px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[12px] text-nowrap tracking-[-0.072px]">
          <p className="leading-[18px]">pipeline</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2770ef] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TagsColumn() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Tags column">
      <div className="absolute bottom-[94.7%] flex items-center justify-center left-0 right-full top-0">
        <div className="flex-none h-px rotate-[270deg] w-[31px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 1">
                <line id="Line 284" stroke="var(--stroke-0, #EAEDF2)" x2="31" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[299px_159px_266px_17px] leading-[20px] not-italic text-[#1d232f] text-[#777e8b] text-[0px] text-[14px] text-nowrap">---</p>
      <Frame3 />
      <Frame8 />
      <Frame9 />
      <Frame7 />
      <Frame6 />
      <Frame4 />
      <Frame5 />
      <p className="absolute font-['Plain:Light',sans-serif] inset-[456px_160px_109px_17px] leading-[20px] not-italic text-[#1d232f] text-[#777e8b] text-[0px] text-[14px] text-nowrap">---</p>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[533px_160px_32px_17px] leading-[20px] not-italic text-[#1d232f] text-[#777e8b] text-[0px] text-[14px] text-nowrap">---</p>
      <p className="absolute font-['Plain:Regular',sans-serif] inset-[1.2%_80.41%_95.73%_6.19%] leading-[18px] not-italic text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">Tags</p>
    </div>
  );
}

function TagsColumn1() {
  return (
    <div className="absolute h-[585px] left-[470px] top-[45px] w-[194px]" data-name="Tags column">
      <TagsColumn />
    </div>
  );
}

function ArrowUpL() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="arrow-up-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-up-l">
          <path d={svgPaths.p7912ef0} fill="var(--fill-0, #2770EF)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function ArrowUpXs() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-up-xs">
      <ArrowUpL />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[12px] top-[7px]">
      <p className="font-['Plain:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">Last viewed</p>
      <ArrowUpXs />
    </div>
  );
}

function LastViewedColumn() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Last viewed column">
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[64.44%_28.33%_32.14%_12.5%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">2 days ago</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[50.94%_33.33%_45.64%_12.5%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">1 year ago</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[37.44%_30%_59.15%_11.67%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">7 days ago</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[23.93%_30%_72.65%_11.67%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">7 days ago</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[10.43%_37.5%_86.15%_11.67%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">1 day ago</p>
      </div>
      <Frame11 />
      <div className="absolute bottom-[94.53%] flex items-center justify-center left-0 right-full top-0">
        <div className="flex-none h-px rotate-[270deg] w-[32px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 1">
                <line id="Line 282" stroke="var(--stroke-0, #EAEDF2)" x2="32" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[91.45%_28.33%_5.13%_12.5%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">2 days ago</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[77.95%_34.17%_18.63%_11.67%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">1 year ago</p>
      </div>
    </div>
  );
}

function LastViewedColumn1() {
  return (
    <div className="absolute h-[585px] left-[826px] top-[45px] w-[120px]" data-name="Last viewed column">
      <LastViewedColumn />
    </div>
  );
}

function NameColumn() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Name column">
      <div className="absolute bottom-[94.7%] flex items-center justify-center left-0 right-full top-0">
        <div className="flex-none h-px rotate-[270deg] w-[31px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 1">
                <line id="Line 284" stroke="var(--stroke-0, #EAEDF2)" x2="31" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Plain:Regular',sans-serif] inset-[1.2%_86.14%_95.73%_3.61%] leading-[18px] not-italic text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">Name</p>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[37.44%_3.31%_59.15%_3.92%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px]">
        <p className="leading-[20px]">Sales by state and region</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[50.94%_3.61%_45.64%_3.61%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px]">
        <p className="leading-[20px]">Total sales, Total quantity purchased by city</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[10.43%_3.61%_86.15%_3.61%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px]">
        <p className="leading-[20px]">Retails Sales</p>
      </div>
      <p className="absolute font-['Plain:Light',sans-serif] inset-[62.74%_3.61%_30.43%_3.61%] leading-[20px] not-italic text-[#1d232f] text-[14px]">{`Total Time Between Sale & Kickoff by Project Sale Date`}</p>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] inset-[23.93%_3.31%_72.65%_3.92%] justify-center leading-[0] not-italic text-[#1d232f] text-[14px]">
        <p className="leading-[20px]">Sales</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] left-[13px] not-italic text-[#1d232f] text-[14px] top-[466px] translate-y-[-50%] w-[308px]">
        <p className="leading-[20px]">Total sales, Total quantity purchased by city</p>
      </div>
      <p className="absolute font-['Plain:Light',sans-serif] leading-[20px] left-[13px] not-italic text-[#1d232f] text-[14px] top-[525px] w-[308px]">{`Total Time Between Sale & Kickoff by Project Sale Date`}</p>
    </div>
  );
}

function NameColumn1() {
  return (
    <div className="absolute h-[585px] left-[94px] top-[45px] w-[332px]" data-name="Name column">
      <NameColumn />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium() {
  return (
    <div className="absolute bottom-[85.13%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[9.4%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium1() {
  return (
    <div className="absolute bottom-[71.62%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[22.91%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar1 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium2() {
  return (
    <div className="absolute bottom-[58.12%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[36.41%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar2 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium3() {
  return (
    <div className="absolute bottom-[44.62%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[49.91%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar3 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium4() {
  return (
    <div className="absolute bottom-[31.11%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[63.42%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar4 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium5() {
  return (
    <div className="absolute bottom-[17.61%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[76.92%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar5 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #48D1E0)" id="Background" r="17" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[12px] text-center top-1/4">
        <p className="leading-[16px]">A</p>
      </div>
      <img alt="" className="block max-w-none size-full" height="32" src={imgInitial} width="32" />
    </div>
  );
}

function AvatarSingleMedium6() {
  return (
    <div className="absolute bottom-[4.44%] content-stretch flex gap-[8px] items-center left-[calc(50%-12px)] top-[90.09%] translate-x-[-50%]" data-name="Avatar-Single-Medium 📖">
      <Avatar6 />
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Anje Keizer</p>
      </div>
    </div>
  );
}

function AuthorColumn() {
  return (
    <div className="absolute bottom-[4.44%] contents left-0 top-0" data-name="Author column">
      <AvatarSingleMedium />
      <AvatarSingleMedium1 />
      <AvatarSingleMedium2 />
      <AvatarSingleMedium3 />
      <AvatarSingleMedium4 />
      <p className="absolute font-['Plain:Regular',sans-serif] inset-[1.2%_68.75%_95.73%_7.5%] leading-[18px] not-italic text-[#777e8b] text-[12px] text-nowrap tracking-[-0.072px]">Author</p>
      <div className="absolute bottom-[94.53%] flex items-center justify-center left-0 right-full top-0">
        <div className="flex-none h-px rotate-[270deg] w-[32px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 1">
                <line id="Line 282" stroke="var(--stroke-0, #EAEDF2)" x2="32" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <AvatarSingleMedium5 />
      <AvatarSingleMedium6 />
    </div>
  );
}

function AuthorColumn1() {
  return (
    <div className="absolute h-[585px] left-[665px] top-[45px] w-[160px]" data-name="Author column">
      <AuthorColumn />
    </div>
  );
}

function ObjectTableContents() {
  return (
    <div className="h-[630px] overflow-clip relative shrink-0 w-full" data-name="Object Table Contents">
      <div className="absolute inset-[82.09%_0_5.97%_0] rounded-[2px]" data-name="Rectangle" />
      <div className="absolute inset-[70.3%_0_17.76%_0] rounded-[2px]" data-name="Rectangle" />
      <Answer />
      <ObjectTableRecentlyViewed />
      <TagsColumn1 />
      <LastViewedColumn1 />
      <NameColumn1 />
      <AuthorColumn1 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group 2995" opacity="0.3">
          <circle cx="12" cy="12" fill="var(--fill-0, #EAEDF2)" id="Ellipse 31" r="12" />
          <g id="chevron-left-l">
            <path clipRule="evenodd" d={svgPaths.p1f00dd80} fill="var(--fill-0, black)" fillRule="evenodd" id="Path" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group 2996">
          <circle cx="6" cy="6" fill="var(--fill-0, #777E8B)" id="Ellipse 31" r="6" transform="rotate(-180 6 6)" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative shrink-0 size-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group 2997">
          <circle cx="6" cy="6" id="Ellipse 31" r="5.5" stroke="var(--stroke-0, #EAEDF2)" transform="rotate(-180 6 6)" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group 3001">
          <circle cx="12" cy="12" fill="var(--fill-0, #EAEDF2)" id="Ellipse 31" r="12" />
          <g id="chevron-left-l">
            <path clipRule="evenodd" d={svgPaths.p1f00dd80} fill="var(--fill-0, black)" fillRule="evenodd" id="Path" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PaginationNumber() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Pagination - Number">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Group />
        </div>
      </div>
      <Group1 />
      {[...Array(2).keys()].map((_, i) => (
        <Group2 key={i} />
      ))}
      <Group3 />
    </div>
  );
}

function Watchlist() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Watchlist">
      <Header1 />
      <ObjectTableContents />
      <PaginationNumber />
    </div>
  );
}

function Group34() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[517px]" data-name="Dropdown">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(246, 248, 250, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 517 40">
            <path d={svgPaths.ped5db00} fill="var(--fill-0, #F6F8FA)" id="Dropdown" />
          </svg>
        </div>
      </div>
      <p className="[grid-area:1_/_1] font-['Plain:Medium',sans-serif] h-[22.222px] leading-[20px] ml-[16px] mt-[8.89px] not-italic overflow-ellipsis overflow-hidden relative text-[#1d232f] text-[14px] text-nowrap w-[244px]">Liveboards</p>
    </div>
  );
}

function Verified() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Verified">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Verified">
          <path d={svgPaths.p353131a0} fill="var(--fill-0, #2770EF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3fd2ff00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Header2() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <Verified />
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group23() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header2 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">4500</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group23 />
      <Group30 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[310.815px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">1.</p>
      <Frame21 />
    </div>
  );
}

function Group24() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.41px] mt-[16px] place-items-start relative">
      <Frame22 />
      <div className="[grid-area:1_/_1] h-0 ml-0 mt-[64px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Verified1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Verified">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Verified">
          <path d={svgPaths.p353131a0} fill="var(--fill-0, #2770EF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3fd2ff00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Header3() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <Verified1 />
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group35() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header3 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy1() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type1 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">3900</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group35 />
      <Group36 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[310.815px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">2.</p>
      <Frame24 />
    </div>
  );
}

function Group25() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.41px] mt-[96px] place-items-start relative">
      <Frame25 />
      <div className="[grid-area:1_/_1] h-0 ml-0 mt-[64px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Verified2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Verified">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Verified">
          <path d={svgPaths.p353131a0} fill="var(--fill-0, #2770EF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3fd2ff00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Header4() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <Verified2 />
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header4 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy2() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type2 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">3100</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy2 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group37 />
      <Group38 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[310.815px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">3.</p>
      <Frame26 />
    </div>
  );
}

function Group26() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.41px] mt-[176px] place-items-start relative">
      <Frame27 />
      <div className="[grid-area:1_/_1] h-0 ml-0 mt-[64px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Verified3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Verified">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Verified">
          <path d={svgPaths.p353131a0} fill="var(--fill-0, #2770EF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3fd2ff00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Header5() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <Verified3 />
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header5 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy3() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type3 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">2500</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy3 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group39 />
      <Group40 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[310.815px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">4.</p>
      <Frame28 />
    </div>
  );
}

function Group27() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.41px] mt-[256px] place-items-start relative">
      <Frame29 />
      <div className="[grid-area:1_/_1] h-0 ml-0 mt-[64px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Verified4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Verified">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Verified">
          <path d={svgPaths.p353131a0} fill="var(--fill-0, #2770EF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3fd2ff00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Header6() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <Verified4 />
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header6 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy4() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type4 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">1500</p>
    </div>
  );
}

function Group42() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy4 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group41 />
      <Group42 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[310.815px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">5.</p>
      <Frame30 />
    </div>
  );
}

function Group28() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.41px] mt-[336px] place-items-start relative">
      <Frame31 />
    </div>
  );
}

function Group29() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[400px] ml-0 mt-0 relative w-[517px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 517 400">
          <path d={svgPaths.p27551e80} fill="var(--fill-0, white)" id="Rectangle 147650" />
        </svg>
      </div>
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
    </div>
  );
}

function Page() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[517px]" data-name="Page 2">
      <div aria-hidden="true" className="absolute border border-[#c0c6cf] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <Group34 />
      <Group29 />
    </div>
  );
}

function Group43() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[517px]" data-name="Dropdown">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(246, 248, 250, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 517 40">
            <path d={svgPaths.ped5db00} fill="var(--fill-0, #F6F8FA)" id="Dropdown" />
          </svg>
        </div>
      </div>
      <p className="[grid-area:1_/_1] font-['Plain:Medium',sans-serif] h-[22.222px] leading-[20px] ml-[16px] mt-[8.89px] not-italic overflow-ellipsis overflow-hidden relative text-[#1d232f] text-[14px] text-nowrap w-[244px]">Answers</p>
    </div>
  );
}

function Header7() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group44() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header7 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy5() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type5 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">4500</p>
    </div>
  );
}

function Group45() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy5 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group44 />
      <Group45 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[303px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">1.</p>
      <Frame32 />
    </div>
  );
}

function Group46() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16px] mt-[15.75px] place-items-start relative">
      <Frame23 />
      <div className="[grid-area:1_/_1] h-0 ml-[0.41px] mt-[64.25px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header8() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group47() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header8 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy6() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type6 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">3900</p>
    </div>
  );
}

function Group48() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy6 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group47 />
      <Group48 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[303px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">2.</p>
      <Frame33 />
    </div>
  );
}

function Group49() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16px] mt-[95.75px] place-items-start relative">
      <Frame34 />
      <div className="[grid-area:1_/_1] h-0 ml-[0.41px] mt-[64.25px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header9() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group50() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header9 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy7() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type7 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">3900</p>
    </div>
  );
}

function Group51() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy7 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group50 />
      <Group51 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[303px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">3.</p>
      <Frame43 />
    </div>
  );
}

function Group52() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16px] mt-[175.75px] place-items-start relative">
      <Frame44 />
      <div className="[grid-area:1_/_1] h-0 ml-[0.41px] mt-[64.25px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header10() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group53() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header10 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy8() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type8 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">2500</p>
    </div>
  );
}

function Group54() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy8 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group53 />
      <Group54 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[303px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">4.</p>
      <Frame45 />
    </div>
  );
}

function Group55() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16px] mt-[255.75px] place-items-start relative">
      <Frame46 />
      <div className="[grid-area:1_/_1] h-0 ml-[0.41px] mt-[64.25px] relative w-[484.175px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484.175 1">
            <line id="Line 1103" stroke="var(--stroke-0, #EAEDF2)" x2="484.175" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header11() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[268px]" data-name="Header">
      <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">Sales by state and region</p>
    </div>
  );
}

function Group56() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Header11 />
      <p className="[grid-area:1_/_1] font-['Plain:Light',sans-serif] leading-[20px] ml-0 mt-[28px] not-italic relative text-[#1d232f] text-[14px] w-[268px]">by Charles Xavier</p>
    </div>
  );
}

function Type9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="eye-l">
          <g id="Path">
            <path d={svgPaths.p285b8680} fill="var(--fill-0, #777E8B)" />
            <path clipRule="evenodd" d={svgPaths.p2ad90600} fill="var(--fill-0, #777E8B)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CreatedBy9() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center ml-0 mt-0 relative w-[61px]" data-name="Created by">
      <Type9 />
      <p className="basis-0 font-['Plain:Light',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">1500</p>
    </div>
  );
}

function Group57() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <CreatedBy9 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex gap-[108px] items-start leading-[0] relative shrink-0 w-[268px]">
      <Group56 />
      <Group57 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[24px] items-start ml-0 mt-0 relative w-[303px]">
      <p className="font-['Plain:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d232f] text-[16px] text-nowrap tracking-[-0.064px]">5.</p>
      <Frame47 />
    </div>
  );
}

function Group58() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16px] mt-[335.75px] place-items-start relative">
      <Frame48 />
    </div>
  );
}

function Group59() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[400px] ml-0 mt-0 relative w-[517px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 517 400">
          <path d={svgPaths.p27551e80} fill="var(--fill-0, white)" id="Rectangle 147650" />
        </svg>
      </div>
      <Group46 />
      <Group49 />
      <Group52 />
      <Group55 />
      <Group58 />
    </div>
  );
}

function Page1() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start ml-0 mt-0 relative rounded-[8px] w-[517px]" data-name="Page 3">
      <div aria-hidden="true" className="absolute border border-[#c0c6cf] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <Group43 />
      <Group59 />
    </div>
  );
}

function Group31() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Page1 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Page />
      <Group31 />
    </div>
  );
}

function Trending() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[495px] items-start justify-center relative shrink-0" data-name="Trending">
      <p className="font-['Plain:Medium',sans-serif] h-[31px] leading-[32px] not-italic relative shrink-0 text-[#1d232f] text-[24px] tracking-[-0.096px] w-[517px]">Trending</p>
      <Frame49 />
    </div>
  );
}

function SelectionBackground() {
  return (
    <div className="absolute contents left-[730px] top-[118px]" data-name="Selection Background">
      <div className="absolute bg-[rgba(113,161,244,0.12)] h-[89px] left-[730px] top-[118px] w-[378px]" />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-[746px] top-[130px]">
      <div className="absolute h-[65px] left-[746px] top-[130px] w-[114px]" data-name="Screenshot 2023-03-01 at 7.48 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.55%] left-[-4.97%] max-w-none top-[-4.77%] w-[109.94%]" src={imgScreenshot20230301At7485} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[20px] left-[873px] not-italic text-[#1d232f] text-[14px] top-[142px] w-[211px]">Getting started with ThoughtSpot analytics</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[746px] top-[215px]">
      <div className="absolute h-[65px] left-[746px] top-[215px] w-[114px]" data-name="Screenshot 2023-03-01 at 7.48 3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.55%] left-[-4.97%] max-w-none top-[-4.77%] w-[109.94%]" src={imgScreenshot20230301At7483} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[20px] left-[873px] not-italic text-[#1d232f] text-[14px] top-[227px] w-[211px]">What’s new in ThoughtSpot Analytics Cloud 9.0.0.cl</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[746px] top-[300px]">
      <div className="absolute h-[65px] left-[746px] top-[300px] w-[114px]" data-name="Screenshot 2023-03-01 at 7.48 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.55%] left-[-4.97%] max-w-none top-[-4.77%] w-[109.94%]" src={imgScreenshot20230301At7484} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[20px] left-[873px] not-italic text-[#1d232f] text-[14px] top-[312px] w-[211px]">{`Going beyond dashboards at Gartner Data & Analytics...`}</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-[746px] top-[385px]">
      <div className="absolute h-[65px] left-[746px] top-[385px] w-[114px]" data-name="Screenshot 2023-03-01 at 7.48 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.55%] left-[-4.97%] max-w-none top-[-4.77%] w-[109.94%]" src={imgScreenshot20230301At7482} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[20px] left-[873px] not-italic text-[#1d232f] text-[14px] top-[397px] w-[211px]">ThoughtSpot Sync for Operationalizing Insights</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[746px] top-[470px]">
      <div className="absolute h-[65px] left-[746px] top-[470px] w-[114px]" data-name="Screenshot 2023-03-01 at 7.48 6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.55%] left-[-4.97%] max-w-none top-[-4.77%] w-[109.94%]" src={imgScreenshot20230301At7486} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[20px] left-[873px] not-italic text-[#1d232f] text-[14px] top-[482px] w-[211px]">What is KPI and how to create your own</p>
    </div>
  );
}

function PlayL() {
  return (
    <div className="absolute left-[318px] size-[118px] top-[227px]" data-name="play-l">
      <div className="absolute inset-[0_0_-8.29%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118 127.778">
          <g filter="url(#filter0_dd_1_4685)" id="play-l">
            <path clipRule="evenodd" d={svgPaths.p3d572900} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="166" id="filter0_dd_1_4685" width="166" x="-24" y="-12">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="12" />
              <feGaussianBlur stdDeviation="12" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.137255 0 0 0 0 0.192157 0 0 0 0.12 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_4685" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.137255 0 0 0 0 0.192157 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_1_4685" mode="normal" result="effect2_dropShadow_1_4685" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_4685" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ModuleLearningVideos() {
  return (
    <div className="h-[587px] overflow-clip relative shrink-0 w-[1106px]" data-name="MODULE • Learning Videos">
      <div className="absolute bg-[#f6f8fa] h-[587px] left-0 top-0 w-[1108px]" />
      <SelectionBackground />
      <div className="absolute h-[459px] left-[25px] top-[88px] w-[705px]" data-name="Screenshot 2023-03-01 at 7.48 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[113.75%] left-[-17.79%] max-w-none top-[-6.13%] w-[131.66%]" src={imgScreenshot20230301At7485} />
        </div>
      </div>
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[32px] left-[25px] not-italic text-[#1d232f] text-[24px] text-nowrap top-[32px] tracking-[-0.096px]">Get the most out of ThoughtSpot</p>
      <Group17 />
      <p className="absolute font-['Plain:Regular',sans-serif] leading-[18px] left-[873px] not-italic text-[#06bf7f] text-[10px] top-[124px] tracking-[-0.06px] w-[197px]">Currently watching</p>
      <Group18 />
      <Group16 />
      <Group15 />
      <Group14 />
      <p className="absolute font-['Plain:Regular',sans-serif] leading-[18px] left-[873px] not-italic text-[#06bf7f] text-[10px] top-[209px] tracking-[-0.06px] w-[197px]">Next</p>
      <p className="absolute font-['Plain:Regular',sans-serif] leading-[18px] left-[1084px] not-italic text-[#2770ef] text-[12px] text-nowrap text-right top-[39px] tracking-[-0.072px] translate-x-[-100%]">View all</p>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] h-[32px] justify-center leading-[0] left-[823.75px] not-italic text-[#2770ef] text-[14px] text-center top-[104px] translate-x-[-50%] translate-y-[-50%] w-[187.5px]">
        <p className="leading-[20px]">Basic</p>
      </div>
      <div className="absolute flex flex-col font-['Plain:Light',sans-serif] h-[32px] justify-center leading-[0] left-[1010.75px] not-italic text-[#1d232f] text-[14px] text-center top-[104px] translate-x-[-50%] translate-y-[-50%] w-[187.5px]">
        <p className="leading-[20px]">Advanced</p>
      </div>
      <div className="absolute bg-[#eaedf2] h-px left-[730px] top-[117px] w-[378px]" />
      <div className="absolute bg-[#2770ef] h-[2px] left-[730px] top-[116px] w-[187px]" />
      <div className="absolute bg-[#1d232f] h-[88px] left-[25px] opacity-60 top-[459px] w-[705px]" />
      <p className="absolute font-['Plain:Medium',sans-serif] leading-[24px] left-[49px] not-italic text-[18px] text-white top-[479px] tracking-[-0.072px] w-[434px]">Getting started with ThoughtSpot analytics</p>
      <p className="absolute font-['Plain:Light',sans-serif] leading-[20px] left-[49px] not-italic text-[14px] text-nowrap text-white top-[511px]">300 views | 1 day ago</p>
      <PlayL />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#eaedf2] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[16px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Plain:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d232f] text-[14px] text-nowrap">
        <p className="leading-[20px]">Customise Homepage</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-0 py-[16px] relative shrink-0 w-full">
      <Button4 />
    </div>
  );
}

function Landing() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[40px] h-[2339px] items-center left-0 pb-[48px] pt-[16px] px-[24px] top-0 w-[1106px]" data-name="Landing">
      <Frame19 />
      <Frame39 />
      <Watchlist />
      <Trending />
      <ModuleLearningVideos />
      <Frame13 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="h-[2047px] relative shrink-0 w-[1106px]">
      <Landing />
    </div>
  );
}

function HomePage() {
  return (
    <div className="absolute bg-[#f6f8fa] content-stretch flex h-[2539px] items-start right-0 top-[147px]" data-name="Home Page">
      <Frame50 />
    </div>
  );
}

function IconFavorite() {
  return (
    <div className="absolute right-[12px] size-[24px] top-[4px]" data-name="icon favorite">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon favorite">
          <path d={svgPaths.p9069680} fill="var(--fill-0, #5F6368)" id="Icon favorites" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[36px] top-[7px]">
      <p className="font-['Plain:Light',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">thoughtspot.com</p>
    </div>
  );
}

function IconFilter() {
  return (
    <div className="absolute left-[4px] size-[24px] top-[4px]" data-name="icon filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon filter">
          <rect fill="var(--fill-0, white)" height="24" rx="12" width="24" />
          <path d={svgPaths.p38a8e800} fill="var(--fill-0, #5F6368)" id="filter icon" />
        </g>
      </svg>
    </div>
  );
}

function Url() {
  return (
    <div className="absolute bg-[#f1f3f4] h-[32px] left-[120px] overflow-clip right-[107px] rounded-[20px] top-[7px]" data-name="url">
      <IconFavorite />
      <Frame2 />
      <IconFilter />
    </div>
  );
}

function IconRefresh() {
  return (
    <div className="absolute left-[85px] size-[18px] top-[14px]" data-name="icon refresh">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="icon refresh">
          <g id="Background"></g>
          <path d={svgPaths.p33067f00} fill="var(--fill-0, #5F6368)" id="Refresh" />
        </g>
      </svg>
    </div>
  );
}

function IconForward() {
  return (
    <div className="absolute left-[49px] size-[18px] top-[14px]" data-name="icon forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="icon forward" opacity="0.5">
          <g id="Background"></g>
          <path d={svgPaths.p279d9080} fill="var(--fill-0, #5F6368)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function IconBack() {
  return (
    <div className="absolute left-[13px] size-[18px] top-[14px]" data-name="icon back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="icon back" opacity="0.5">
          <g id="Background"></g>
          <path d={svgPaths.p3c821f00} fill="var(--fill-0, #5F6368)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function UrlBar() {
  return (
    <div className="absolute bg-white border-[#f1f3f4] border-[0px_0px_1px] border-solid h-[47px] left-0 right-0 top-[40px]" data-name="url bar">
      <Url />
      <IconRefresh />
      <IconForward />
      <IconBack />
    </div>
  );
}

function WindowControls() {
  return (
    <div className="absolute h-[12px] left-[21px] top-[14px] w-[52px]" data-name="window controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 12">
        <g id="window controls">
          <path d={svgPaths.p177389f0} fill="var(--fill-0, #FF5F57)" id="Close" stroke="var(--stroke-0, #DF413F)" />
          <path d={svgPaths.p20200e80} fill="var(--fill-0, #FFBD2E)" id="Minimize" stroke="var(--stroke-0, #DD9B2D)" />
          <path d={svgPaths.p18ca1d00} fill="var(--fill-0, #27C940)" id="Maximize" stroke="var(--stroke-0, #21A52F)" />
        </g>
      </svg>
    </div>
  );
}

function IconClose() {
  return (
    <div className="absolute right-[11.62px] size-[16px] top-[7px]" data-name="icon close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon close">
          <path d={svgPaths.pc87e500} fill="var(--fill-0, #5F6368)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function TsMono() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="TS Mono">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="TS Mono">
          <g id="Vector">
            <path d={svgPaths.p2518680} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p1abe1e00} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p123dc380} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p393f4180} fill="var(--fill-0, #1D232F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[14.703px] items-center left-[16.38px] top-[7px]">
      <TsMono />
      <p className="font-['Plain:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap">ThoughtSpot</p>
    </div>
  );
}

function CurrentTab() {
  return (
    <div className="absolute h-[34px] left-[85px] top-[6px] w-[146px]" data-name="current tab">
      <div className="absolute h-[34px] left-[-9px] right-0 top-0" data-name="tab background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 34">
          <path d={svgPaths.p39573700} fill="var(--fill-0, white)" id="tab background" />
        </svg>
      </div>
      <IconClose />
      <Frame />
    </div>
  );
}

function TsMono1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="TS Mono">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="TS Mono">
          <g id="Vector">
            <path d={svgPaths.p2518680} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p1abe1e00} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p123dc380} fill="var(--fill-0, #1D232F)" />
            <path d={svgPaths.p393f4180} fill="var(--fill-0, #1D232F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <TsMono1 />
      <div className="flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap">
        <p className="leading-[normal]">ThoughtSpot</p>
      </div>
    </div>
  );
}

function AdditionalTab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-0 py-[7px] relative shrink-0" data-name="additional tab">
      <Frame1 />
      <div className="bg-[#5f6368] h-[16px] opacity-20 rounded-[10px] shrink-0 w-[2px]" />
    </div>
  );
}

function IconNewTab() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon new tab">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon new tab">
          <path d={svgPaths.pb492200} fill="var(--fill-0, #5F6368)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function OtherTabs() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[231px] top-[6px]" data-name="other tabs">
      <AdditionalTab />
      <IconNewTab />
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="download">
          <path d={svgPaths.p1307b400} fill="var(--fill-0, #5F6368)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function AvatarUser() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="avatar user">
      <div className="absolute right-[2px] size-[20px] top-[2px]" data-name="user avatar">
        <img alt="" className="block max-w-none size-full" height="20" src={imgUserAvatar} width="20" />
      </div>
    </div>
  );
}

function IconMore() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon more">
          <path d={svgPaths.p8ce970} fill="var(--fill-0, #5F6368)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function RighthandActions() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center right-[3px] top-[51px]" data-name="righthand actions">
      <Download />
      <AvatarUser />
      <IconMore />
    </div>
  );
}

function Browser() {
  return (
    <div className="absolute bg-[#dee1e6] h-[87px] left-0 rounded-tl-[10px] rounded-tr-[10px] top-0 w-[1366px]" data-name="Browser">
      <UrlBar />
      <WindowControls />
      <CurrentTab />
      <OtherTabs />
      <RighthandActions />
      <div className="absolute flex flex-col font-['Plain:Regular',sans-serif] justify-center leading-[0] left-[2px] not-italic text-[#777e8b] text-[12px] text-nowrap top-[-23px] tracking-[-0.072px] translate-y-[-50%]">
        <p className="leading-[18px]">Light theme</p>
      </div>
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute contents font-['Plain:Light',sans-serif] inset-[21.88%_8.24%_-359.38%_0] leading-[0] not-italic text-[#777e8b] text-[14px] text-nowrap">
      <div className="absolute flex flex-col inset-[21.88%_21.18%_15.63%_0] justify-center">
        <p className="leading-[20px] text-nowrap">Search in your library</p>
      </div>
      <div className="absolute flex flex-col inset-[146.88%_8.24%_-109.38%_0] justify-center">
        <p className="leading-[20px] text-nowrap">Press Cmd + k to search</p>
      </div>
      <div className="absolute flex flex-col inset-[271.88%_9.41%_-234.38%_0] justify-center">
        <p className="leading-[20px] text-nowrap">Refer to popular queries</p>
      </div>
      <div className="absolute flex flex-col inset-[396.88%_21.18%_-359.38%_0] justify-center">
        <p className="leading-[20px] text-nowrap">Search in your library</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute inset-[0_3.7%_0_17.59%] overflow-clip" data-name="text">
      <div className="absolute inset-0 rounded-[140px]" />
      <Group60 />
    </div>
  );
}

function SearchBar1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[216px]" data-name="Search Bar">
      <div className="absolute bg-[#232f43] border border-[#323946] border-solid inset-0 rounded-[140px]" />
      <Text4 />
      <div className="absolute bottom-[21.88%] left-[5.56%] right-[86.38%] top-1/4" data-name="Path">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4142 17">
          <path clipRule="evenodd" d={svgPaths.p2b964b80} fill="var(--fill-0, #A5ACB9)" fillRule="evenodd" id="Path" />
        </svg>
      </div>
    </div>
  );
}

function IconButtton1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon buttton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" fill="var(--fill-0, #232F43)" id="Background" r="16" />
      </svg>
      <div className="absolute bottom-1/4 left-[36.88%] right-[36.56%] top-1/4" data-name="Path">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.5 16">
          <g id="Path">
            <path d={svgPaths.p33c5c200} fill="#DBDFE7" />
            <path d="M5.2 13H3.2V16H5.2V13Z" fill="#DBDFE7" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[0.697px] inset-[24.95%_25.69%_25.05%_26.34%] items-center">
      <div className="h-[13.589px] relative shrink-0 w-[15.349px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3491 13.5893">
          <path d={svgPaths.p10054600} fill="var(--fill-0, #DBDFE7)" id="Vector" />
        </svg>
      </div>
      <div className="h-[1.714px] relative shrink-0 w-[4.647px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.64713 1.71363">
          <path d={svgPaths.p1f87b0c0} fill="var(--fill-0, #DBDFE7)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function IconButtton2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon buttton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" fill="var(--fill-0, #232F43)" id="Background" r="16" />
      </svg>
      <Frame14 />
      <div className="absolute left-[20px] size-[12px] top-[-2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="var(--fill-0, #E22B3D)" id="Ellipse 260" r="6" />
        </svg>
      </div>
    </div>
  );
}

function ChevronDownL() {
  return (
    <div className="relative size-full" data-name="chevron-down-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="chevron-down-l">
          <path clipRule="evenodd" d={svgPaths.p242b7bba} fill="var(--fill-0, #DBDFE7)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDownXs() {
  return (
    <div className="relative size-full" data-name="chevron-down-xs">
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none rotate-[180deg] size-[12px]">
          <ChevronDownL />
        </div>
      </div>
    </div>
  );
}

function ChevronDownXs1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down-xs">
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none rotate-[180deg] size-[12px]">
          <ChevronDownXs />
        </div>
      </div>
    </div>
  );
}

function OrgName() {
  return (
    <div className="bg-[#232f43] content-stretch flex gap-[4px] items-center pb-[5px] pl-[8px] pr-[5px] pt-[7px] relative rounded-bl-[20px] rounded-tl-[20px] shrink-0" data-name="Org name">
      <div aria-hidden="true" className="absolute border-[#323946] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-tl-[20px]" />
      <div className="flex flex-col font-['Plain:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap text-right">
        <p className="leading-[20px]">Royal Enfiled</p>
      </div>
      <ChevronDownXs1 />
    </div>
  );
}

function Avatar7() {
  return (
    <div className="bg-[#232f43] content-stretch flex items-center p-[2px] relative rounded-br-[20px] rounded-tr-[20px] shrink-0 size-[32px]" data-name="Avatar">
      <div className="relative shrink-0 size-[28px]" data-name="Avatar">
        <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
      </div>
    </div>
  );
}

function Switcher() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Switcher">
      <OrgName />
      <Avatar7 />
    </div>
  );
}

function GlobalToolbar() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-start right-[23px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Global Toolbar">
      <SearchBar1 />
      <IconButtton1 />
      <IconButtton2 />
      <Switcher />
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute h-[24px] left-[-78px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[119.792px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.792 24.001">
        <g id="Logo">
          <path d={svgPaths.p36bf9d00} fill="var(--fill-0, white)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute h-[60px] left-0 top-0 w-[260px]">
      <div className="absolute inset-[0_0_-1.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 260 61">
          <g id="Frame 7559689">
            <g clipPath="url(#clip0_1_4625)">
              <mask fill="black" height="61" id="path-1-outside-1_1_4625" maskUnits="userSpaceOnUse" width="260" x="0" y="0">
                <rect fill="white" height="61" width="260" />
                <path d="M0 0H260V60H0V0Z" />
              </mask>
              <path d="M0 0H260V60H0V0Z" fill="var(--fill-0, #1D232F)" />
              <circle cx="-13" cy="30" fill="var(--fill-0, #71A1F4)" fillOpacity="0.12" id="Ellipse 262" opacity="0" r="18" />
            </g>
            <path d="M260 60V59H0V60V61H260V60Z" fill="var(--stroke-0, #323946)" mask="url(#path-1-outside-1_1_4625)" />
          </g>
          <defs>
            <clipPath id="clip0_1_4625">
              <path d="M0 0H260V60H0V0Z" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function TsMono2() {
  return (
    <div className="absolute inset-[30%_96.24%_30%_2%]" data-name="TS Mono">
      <div className="absolute aspect-[37.2155/37.6694] left-0 right-[1.2%] top-1/2 translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7108 24">
            <g id="Vector">
              <path d={svgPaths.p1c64eb00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p34d19400} fill="var(--fill-0, white)" />
              <path d={svgPaths.p221f7f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pf05b80} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[30%_96.24%_30%_-0.95%]">
      <TsMono2 />
      <div className="absolute inset-[40%_99.63%_40%_-0.95%]" data-name="Path">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d={svgPaths.p207f8c80} fill="var(--fill-0, #DBDFE7)" id="Path" opacity="0" />
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[-22px] top-[12px]">
      <Group19 />
      <div className="absolute left-[-22px] size-[36px] top-[12px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="18" cy="18" fill="var(--fill-0, #71A1F4)" fillOpacity="0.12" id="Ellipse 262" opacity="0" r="18" />
        </svg>
      </div>
    </div>
  );
}

function GlobalNavBar() {
  return (
    <div className="absolute bg-[#1d232f] border-[#323946] border-[0px_0px_1px] border-solid h-[60px] left-1/2 overflow-clip top-[87px] translate-x-[-50%] w-[1366px]" data-name="Global Nav Bar">
      <GlobalToolbar />
      <Logo />
      <Frame15 />
      <Group21 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute bg-[#dbdfe7] inset-[41.67%_70.59%_0_0] rounded-tl-[1px] rounded-tr-[1px]" />
      <div className="absolute bg-[#dbdfe7] inset-[0_35.29%] rounded-tl-[1px] rounded-tr-[1px]" />
      <div className="absolute bg-[#dbdfe7] inset-[16.67%_0_0_70.59%] rounded-tl-[1px] rounded-tr-[1px]" />
    </div>
  );
}

function PrimaryIcons() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Primary Icons">
      <Group20 />
    </div>
  );
}

function Component3TabsInsightsAppTab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[34px] py-[18px] relative shrink-0 w-[87px]" data-name="3 tabs | Insights App Tab">
      <div className="absolute bg-[#232f43] h-[54px] left-0 top-0 w-[87px]" data-name="Background" />
      <PrimaryIcons />
    </div>
  );
}

function PrimaryIcons1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Primary Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Primary Icons">
          <path clipRule="evenodd" d={svgPaths.p251a6400} fill="var(--fill-0, #C0C6CF)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Component3TabsDataWorkspaceAppTab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[34px] py-[18px] relative shrink-0 w-[87px]" data-name="3 tabs | Data Workspace App Tab">
      <div className="absolute bg-[#1d232f] h-[54px] left-0 top-0 w-[87px]" data-name="Background" />
      <PrimaryIcons1 />
    </div>
  );
}

function PrimaryIcons2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Primary Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Primary Icons">
          <g id="</>">
            <path d={svgPaths.p33f7fb00} fill="var(--fill-0, #C0C6CF)" />
            <path d={svgPaths.pe3ee880} fill="var(--fill-0, #C0C6CF)" />
            <path d={svgPaths.p274b1e00} fill="var(--fill-0, #C0C6CF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component3TabsDevelopAppTab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[34px] py-[18px] relative shrink-0 w-[87px]" data-name="3 tabs | Develop App Tab">
      <div className="absolute bg-[#1d232f] h-[54px] left-0 top-0 w-[87px]" data-name="Background" />
      <PrimaryIcons2 />
    </div>
  );
}

function Component3TabsAppTabSwitcher() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[261px]" data-name="3 tabs | App Tab Switcher">
      <Component3TabsInsightsAppTab />
      <Component3TabsDataWorkspaceAppTab />
      <Component3TabsDevelopAppTab />
      <div className="absolute flex h-[54px] items-center justify-center left-[86px] top-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[54px]">
            <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(50, 57, 70, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 1">
                <line id="Line 1" stroke="var(--stroke-0, #323946)" x2="54" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center right-0 top-[53px] w-[174px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[174px]">
            <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(50, 57, 70, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 174 1">
                <line id="Line 4" stroke="var(--stroke-0, #323946)" x2="174" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrossCircleL() {
  return (
    <div className="relative size-[18px]" data-name="cross-circle-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="cross-circle-l">
          <path clipRule="evenodd" d={svgPaths.pa15a3b2} fill="var(--fill-0, #DBDFE7)" fillRule="evenodd" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryIcons3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Primary Icons">
      <div className="absolute flex items-center justify-center left-1/2 size-[25.456px] top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg]">
          <CrossCircleL />
        </div>
      </div>
    </div>
  );
}

function TabHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tab Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[12px] relative w-full">
          <p className="basis-0 font-['Plain:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#dbdfe7] text-[18px] tracking-[-0.072px]">Insights</p>
          <PrimaryIcons3 />
        </div>
      </div>
    </div>
  );
}

function NavListItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute bg-[rgba(113,161,244,0.12)] h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#71a1f4] text-[14px] text-nowrap">Home</p>
    </div>
  );
}

function NavListItem1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">Spotter</p>
    </div>
  );
}

function NavListItem2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">Search data</p>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Section 1">
      <NavListItem />
      <NavListItem1 />
      <NavListItem2 />
    </div>
  );
}

function NavSectionHeader() {
  return (
    <div className="content-stretch flex items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav Section Header">
      <p className="basis-0 font-['BB_Roller_Mono_Pro_TX:Bold',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#a5acb9] text-[10px] tracking-[0.6px] uppercase">Library</p>
    </div>
  );
}

function NavListItem3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">Liveboards</p>
    </div>
  );
}

function NavListItem4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">Answers</p>
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Section 2">
      <NavSectionHeader />
      <NavListItem3 />
      <NavListItem4 />
    </div>
  );
}

function NavSectionHeader1() {
  return (
    <div className="content-stretch flex items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav Section Header">
      <p className="basis-0 font-['BB_Roller_Mono_Pro_TX:Bold',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#a5acb9] text-[10px] tracking-[0.6px] uppercase">{`Analysis & Alerts`}</p>
    </div>
  );
}

function NavListItem5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">Subscriptions</p>
    </div>
  );
}

function NavListItem6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[6px] relative shrink-0 w-[261px]" data-name="Nav List Item">
      <div className="absolute h-[32px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[261px]" data-name="Background" />
      <p className="font-['Plain:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#dbdfe7] text-[14px] text-nowrap">SpotIQ analysis</p>
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Section 3">
      <NavSectionHeader1 />
      <NavListItem5 />
      <NavListItem6 />
    </div>
  );
}

function AllSections() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="All sections">
      <Section />
      <Section1 />
      <Section2 />
    </div>
  );
}

function MainMenu() {
  return (
    <div className="basis-0 bg-[#232f43] content-stretch flex flex-col gap-[16px] grow items-center min-h-px min-w-px overflow-clip pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Main Menu">
      <TabHeader />
      <AllSections />
    </div>
  );
}

function LeftNav() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col h-[742px] items-start left-0 w-[261px]" data-name="Left Nav">
      <div aria-hidden="true" className="absolute border-[#777e8b] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Component3TabsAppTabSwitcher />
      <MainMenu />
      <div className="absolute flex h-[829px] items-center justify-center right-px top-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[829px]">
            <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(50, 57, 70, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 829 1">
                <line id="Line 1" stroke="var(--stroke-0, #323946)" x2="829" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage1() {
  return (
    <div className="bg-white relative size-full" data-name="Home page">
      <GlobalNavBar />
      <LeftNav />
      <HomePage />
      <Browser />
    </div>
  );
}