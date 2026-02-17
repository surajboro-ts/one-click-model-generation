import React, { useState, useRef, useEffect } from 'react';
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { Icon } from '../../components/icons';
import { Button } from '../../components/Button';

/**
 * ChartEditorAI — Chart editor with Spotter AI assistant
 *
 * Pixel-accurate reproduction of Figma node 438:201306.
 * Layout: GlobalHeader (48px) | QueryBar (48px) | [ChartArea | Toolbar(64px) | SpotterPanel(286px)]
 */

// ─── Data ────────────────────────────────────────────────────────────────────

const MONTHS = ['Jan\n2025','Feb','Mar','April','May','Jun','July','Aug','Sep','Oct','Nov','Dec','Jan\n2025','Feb'];
const BARS = [3200,4100,4600,4400,3700,4200,3100,4200,3900,4400,3700,3700,5500,6300];
const TARGET = 5400;
const MAX_Y = 8500;

const SUGGESTIONS = [
  { id:'gridlines', title:'Remove gridlines', sub:'' },
  { id:'conditional', title:'Remove conditional\nformatting', sub:'on recent months' },
  { id:'filters', title:'Add filters', sub:'to show this FY (2025-56)' },
];

interface Msg { role:'user'|'ai'; text:string }

// Toolbar icons — mapped from Figma node 438:201415 screenshot
const TB_TOP: Array<{id:string; icon:React.ComponentProps<typeof Icon>['name']}> = [
  {id:'spotter',icon:'spotter'},
  {id:'chart',icon:'chart'},
  {id:'grid',icon:'grid-view'},
  {id:'bars',icon:'conditional-format'},
  {id:'download',icon:'download'},
  {id:'number',icon:'number-format'},
  {id:'monitor',icon:'monitor'},
  {id:'controls',icon:'controls'},
  {id:'cog',icon:'cog'},
];
const TB_BOT: typeof TB_TOP = [
  {id:'code',icon:'formula'},
  {id:'r-analysis',icon:'r-analysis'},
  {id:'bolt',icon:'bulb'},
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function aiReply(t:string):string {
  const l = t.toLowerCase();
  if (l.includes('gridline')) return 'Done! I\'ve removed the gridlines. The chart now shows only the bars and target line for a cleaner look.';
  if (l.includes('conditional')) return 'Removed the conditional formatting on Jan and Feb 2025. Both bars now use the standard color.';
  if (l.includes('filter')) return 'Added a filter for FY 2025-56. The chart now shows only the filtered fiscal year range.';
  return 'I\'ve analyzed the chart. Sales show a strong upward trend — Jan at 5.5k and Feb at 6.3k, both above the 5.4k target. Want me to add annotations or adjust the visualization?';
}

// ─── Component ───────────────────────────────────────────────────────────────

export const ChartEditorAI: React.FC = () => {
  const [panel, setPanel] = useState(true);
  const [active, setActive] = useState('spotter');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [prompt, setPrompt] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatRef.current?.scrollTo(0, chatRef.current.scrollHeight); }, [msgs]);

  const toggle = (id:string) => { if (id===active) setPanel(p=>!p); else { setActive(id); setPanel(true); } };
  const send = () => { if (!prompt.trim()) return; push(prompt.trim()); setPrompt(''); };
  const push = (text:string) => {
    const u:Msg = {role:'user',text};
    setMsgs(p=>[...p,u]);
    setTimeout(()=>setMsgs(p=>[...p,{role:'ai',text:aiReply(text)}]),700);
  };

  return (
    <div style={S.root}>
      {/* ━━ Global Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header style={S.hdr}>
        <div style={S.hL}>
          <button style={S.hBtn}><Icon name="hamburger" size="m" color="#fff" /></button>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 4L4 10l12 6 12-6L16 4z" fill="#fff"/><path d="M4 22l12 6 12-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16l12 6 12-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={S.hSearch}><Icon name="magnifying-glass" size="s" color="rgba(255,255,255,.45)" /><span style={{fontSize:'14px',color:'rgba(255,255,255,.45)'}}>Search in your library</span></div>
        <div style={S.hR}>
          <button style={S.hBtn}><Icon name="question-mark" size="m" color="rgba(255,255,255,.7)" /></button>
          <button style={{...S.hBtn,position:'relative'}}><Icon name="information" size="m" color="rgba(255,255,255,.7)" /><span style={S.hDot}/></button>
          <div style={S.hAv}><Icon name="profile" size="s" color="#fff" /></div>
        </div>
      </header>

      {/* ━━ Query Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={S.qBar}>
        <div style={S.qBox}>
          <div style={S.qSrc}>
            <button style={S.hBtn}><Icon name="hamburger" size="s" color={referenceColors.gray['70']} /></button>
            <span style={S.qDiv}/>
            <span style={{fontSize:'14px',fontWeight:500,color:'#1D232F'}}>Retail Apparel</span>
            <Icon name="chevron-down" size="s" color={systemColors.light['content-tertiary']} />
          </div>
          <span style={S.qDiv}/>
          <div style={{display:'flex',alignItems:'center',flex:1,justifyContent:'space-between',minWidth:0}}>
            <div style={S.qTokens}>
              <Icon name="magnifying-glass" size="s" color={systemColors.light['content-tertiary']} />
              <span style={{...S.tok,backgroundColor:'#E6EDFA',color:'#1C2330'}}>Product</span>
              <span style={{...S.tok,backgroundColor:'#E0F8EF',color:referenceColors.green['70']}}>Total sales</span>
              <span style={{...S.tok,backgroundColor:'#F0EBFF',color:'#1D232F'}}>Monthly</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:`${spacing.B}px`,flexShrink:0}}>
              <button style={S.hBtn}><Icon name="cross" size="s" color={systemColors.light['content-tertiary']} /></button>
              <Button variant="secondary" size="small">Go</Button>
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:`${spacing.A}px`,flexShrink:0}}>
          <button style={S.hBtn}><Icon name="undo" size="s" color={systemColors.light['content-tertiary']} /></button>
          <button style={S.hBtn}><Icon name="redo" size="s" color={systemColors.light['content-tertiary']} /></button>
          <button style={S.hBtn}><Icon name="reset" size="s" color={systemColors.light['content-tertiary']} /></button>
        </div>
      </div>

      {/* ━━ Body ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={S.body}>

        {/* ── Chart Area ── */}
        <div style={S.chart}>
          {/* Heading */}
          <div style={S.cH}>
            <div>
              <div style={{fontSize:'20px',fontWeight:500,color:'#1D232F',lineHeight:'28px',letterSpacing:'-0.08px'}}>Sales per month for south region</div>
              <div style={{fontSize:'16px',fontWeight:300,color:'#777E8B',lineHeight:'24px',marginTop:'2px'}}>Sales Insight</div>
            </div>
            <div style={S.cA}>
              {/* Segmented control: table | chart */}
              <div style={S.seg}>
                <div style={S.segActive}/>
                <button style={{...S.segBtn,zIndex:2}}><Icon name="table" size="s" color={systemColors.light['content-secondary']} /></button>
                <button style={{...S.segBtn,zIndex:2}}><Icon name="chart" size="s" color={systemColors.light['content-brand']} /></button>
              </div>
              <button style={S.cBtn}><Icon name="share" size="s" color={systemColors.light['content-secondary']} /></button>
              <button style={S.cBtn}><Icon name="more" size="s" color={systemColors.light['content-secondary']} /></button>
              <span style={{width:'1px',height:'20px',backgroundColor:systemColors.light['background-subtle']}}/>
              {/* Save split button */}
              <div style={S.splitBtn}>
                <span style={{fontSize:'14px',fontWeight:300,color:'#fff',paddingLeft:'16px',paddingRight:'8px'}}>Sales_Ame..</span>
                <span style={{width:'1px',height:'20px',backgroundColor:'rgba(255,255,255,.3)'}}/>
                <span style={{padding:'0 8px',display:'flex'}}><Icon name="chevron-down" size="s" color="#fff" /></span>
              </div>
              <Button variant="primary" size="small">Pin</Button>
            </div>
          </div>

          {/* Insight chip */}
          <div style={S.ins}>
            <span style={{fontWeight:600,color:'#1D232F'}}>Insights :</span>
            <span style={{color:'#777E8B',flex:1}}>Sales are up by 11% since last two months</span>
            <span style={{color:systemColors.light['content-brand'],fontWeight:500,cursor:'pointer',whiteSpace:'nowrap'}}>Drill down</span>
          </div>

          {/* Chart */}
          <div style={S.cWrap}>
            <div style={S.yCol}>
              <div style={S.yLbl}>Total Sales</div>
              <div style={S.yVals}>
                {['8K','6K','4k','2K','0'].map((t,i)=><span key={i} style={{fontSize:'12px',color:systemColors.light['content-secondary']}}>{t}</span>)}
              </div>
            </div>
            <div style={S.plot}>
              {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',left:0,right:0,top:`${i*25}%`,height:'1px',backgroundColor:systemColors.light['background-subtle']}}/>)}
              <div style={{position:'absolute',left:0,right:0,top:`${((MAX_Y-TARGET)/MAX_Y)*100}%`,borderTop:`2px dashed ${referenceColors.brand['40']}`,zIndex:2}}>
                <span style={{position:'absolute',right:'40px',top:'-18px',fontSize:'12px',fontWeight:500,color:referenceColors.brand['50'],whiteSpace:'nowrap'}}>Target : 5.4k</span>
              </div>
              <div style={S.bars}>
                {BARS.map((v,i)=>{
                  const pct=(v/MAX_Y)*100;
                  const hi=i>=12;
                  return(
                    <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',height:'100%'}}>
                      {hi&&<span style={{fontSize:'11px',fontWeight:600,color:'#fff',backgroundColor:systemColors.light['content-brand'],borderRadius:'4px',padding:'2px 6px',marginBottom:'4px',zIndex:3}}>{(v/1000).toFixed(1)}k</span>}
                      <div style={{width:'65%',maxWidth:'42px',height:`${pct}%`,backgroundColor:hi?systemColors.light['content-brand']:referenceColors.brand['40'],borderRadius:'2px 2px 0 0'}}/>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* X labels */}
          <div style={{display:'flex',marginTop:`${spacing.B}px`}}>
            <div style={{width:'52px',flexShrink:0}}/>
            <div style={{display:'flex',flex:1}}>
              {MONTHS.map((m,i)=><span key={i} style={{flex:1,textAlign:'center',fontSize:'12px',color:i>=12?systemColors.light['content-brand']:systemColors.light['content-secondary'],fontWeight:i>=12?600:400,whiteSpace:'pre-line',lineHeight:'1.25'}}>{m}</span>)}
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'4px',marginTop:`${spacing.C}px`,paddingBottom:`${spacing.B}px`}}>
            <span style={{fontSize:'12px',color:systemColors.light['content-secondary']}}>Monthly · Fiscal (for FY 2025)</span>
            <Icon name="arrow-up" size="s" color={systemColors.light['content-brand']} />
          </div>
        </div>

        {/* ── Right Toolbar (64px) ── */}
        <div style={S.tb}>
          <div style={{display:'flex',flexDirection:'column',paddingTop:`${spacing.D}px`}}>
            {TB_TOP.map(t=>{
              const on=panel&&active===t.id;
              return(
                <button key={t.id} onClick={()=>toggle(t.id)} style={{...S.tbI,backgroundColor:on?'#E6EEF9':'transparent',borderLeft:on?`3px solid ${systemColors.light['content-brand']}`:'3px solid transparent'}}>
                  <Icon name={t.icon} size="m" color={on?systemColors.light['content-brand']:systemColors.light['content-secondary']}/>
                </button>
              );
            })}
          </div>
          <div style={{height:'1px',backgroundColor:systemColors.light['background-subtle'],margin:`${spacing.B}px 0`}}/>
          <div style={{display:'flex',flexDirection:'column'}}>
            {TB_BOT.map(t=>(
              <button key={t.id} style={S.tbI}><Icon name={t.icon} size="m" color={systemColors.light['content-secondary']}/></button>
            ))}
          </div>
        </div>

        {/* ── Spotter Panel (286px) ── */}
        {panel && active==='spotter' && (
          <div style={S.pn}>
            {/* Header */}
            <div style={S.pnH}><span style={{fontSize:'16px',fontWeight:600,color:'#1D232F'}}>Spotter</span></div>

            {/* Content */}
            <div ref={chatRef} style={S.pnB}>
              {msgs.length===0 ? (
                <>
                  {/* AI suggestions header */}
                  <div style={{display:'flex',alignItems:'center',gap:`${spacing.B}px`,marginBottom:`${spacing.E}px`}}>
                    <Icon name="ai" size="s" color={referenceColors.brand['50']} />
                    <span style={{fontSize:'12px',fontWeight:400,color:'#A5ACB9',letterSpacing:'-0.07px'}}>AI suggestions</span>
                  </div>
                  {/* Suggestion cards */}
                  <div style={{display:'flex',flexDirection:'column',gap:`${spacing.B}px`}}>
                    {SUGGESTIONS.map(sg=>(
                      <button key={sg.id} onClick={()=>push(sg.title.replace('\n',' '))} style={S.sgCard}>
                        <div style={S.sgIcon}><Icon name="ai" size="s" color={referenceColors.gray['70']} /></div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:'14px',fontWeight:400,color:'#1D232F',lineHeight:'19px',whiteSpace:'pre-line'}}>{sg.title}</div>
                          {sg.sub&&<div style={{fontSize:'13px',fontWeight:300,color:'#777E8B',lineHeight:'19px',letterSpacing:'-0.08px'}}>{sg.sub}</div>}
                        </div>
                        <Icon name="chevron-right" size="s" color={systemColors.light['border-default']} />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                /* Chat */
                <div style={{display:'flex',flexDirection:'column',gap:`${spacing.C}px`}}>
                  {msgs.map((m,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                      <div style={{
                        maxWidth:'88%',
                        padding:`${spacing.C}px ${spacing.D}px`,
                        borderRadius:m.role==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px',
                        backgroundColor:m.role==='user'?systemColors.light['content-brand']:systemColors.light['background-sunken'],
                        color:m.role==='user'?'#fff':'#1D232F',
                        fontSize:'14px',lineHeight:'20px',fontWeight:300,
                      }}>{m.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt */}
            <div style={S.pnF}>
              <div style={S.pnIn}>
                <input
                  type="text" placeholder="Enter a prompt here"
                  value={prompt} onChange={e=>setPrompt(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&send()}
                  style={S.pnInF}
                />
                <button onClick={send} style={S.pnSend}><Icon name="paper-plane" size="s" color="#fff"/></button>
              </div>
              <div style={{fontSize:'11px',color:'#A5ACB9',lineHeight:'16px',marginTop:`${spacing.A}px`}}>
                Spotter can make mistakes, please review data before proceeding. <a href="#" style={{color:systemColors.light['content-brand'],textDecoration:'none',fontWeight:500}}>Learn more</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const S: Record<string,React.CSSProperties> = {
  root:{display:'flex',flexDirection:'column',height:'100vh',fontFamily:'"Plain",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',overflow:'hidden',backgroundColor:'#fff'},

  // Header — 60px, #1D232F (from Figma: 1440x60)
  hdr:{display:'flex',alignItems:'center',justifyContent:'space-between',height:'60px',padding:`0 ${spacing.D}px`,backgroundColor:'#1D232F',flexShrink:0},
  hL:{display:'flex',alignItems:'center',gap:`${spacing.C}px`},
  hSearch:{display:'flex',alignItems:'center',gap:`${spacing.B}px`,backgroundColor:'rgba(255,255,255,.1)',borderRadius:'20px',padding:`6px ${spacing.D}px`,width:'240px'},
  hR:{display:'flex',alignItems:'center',gap:`${spacing.C}px`},
  hBtn:{background:'none',border:'none',cursor:'pointer',padding:'4px',display:'flex',alignItems:'center',justifyContent:'center'},
  hDot:{position:'absolute',top:'0',right:'0',width:'8px',height:'8px',borderRadius:'50%',backgroundColor:systemColors.light['content-brand'],border:'2px solid #1D232F'},
  hAv:{width:'28px',height:'28px',borderRadius:'50%',backgroundColor:systemColors.light['content-brand'],display:'flex',alignItems:'center',justifyContent:'center'},

  // Query bar
  qBar:{display:'flex',alignItems:'center',padding:`${spacing.B}px ${spacing.E}px`,gap:`${spacing.B}px`,borderBottom:`1px solid ${systemColors.light['background-subtle']}`,flexShrink:0},
  qBox:{display:'flex',alignItems:'center',flex:1,gap:`${spacing.D}px`,backgroundColor:'#fff',borderRadius:'4px',padding:`${spacing.A}px ${spacing.B}px ${spacing.A}px ${spacing.E}px`,boxShadow:'0 0 4px rgba(25,35,49,.1), 0 2px 4px rgba(25,35,49,.04)'},
  qSrc:{display:'flex',alignItems:'center',gap:`${spacing.B}px`,flexShrink:0},
  qDiv:{width:'1px',height:'24px',backgroundColor:'#EAEDF2',flexShrink:0},
  qTokens:{display:'flex',alignItems:'center',gap:`${spacing.B}px`},
  tok:{fontSize:'14px',fontWeight:300,padding:'2px 4px',borderRadius:'4px',lineHeight:'20px'},

  // Body
  body:{flex:1,display:'flex',overflow:'hidden'},

  // Chart
  chart:{flex:1,display:'flex',flexDirection:'column',padding:`${spacing.F}px`,overflow:'auto'},
  cH:{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:`${spacing.D}px`},
  cA:{display:'flex',alignItems:'center',gap:`${spacing.B}px`,flexShrink:0},
  seg:{position:'relative',display:'flex',alignItems:'center',width:'60px',height:'32px',backgroundColor:'#EAEDF2',borderRadius:'17px',overflow:'hidden'},
  segActive:{position:'absolute',left:'2px',top:'2px',width:'28px',height:'28px',borderRadius:'17px',backgroundColor:'#fff',boxShadow:'0 2px 4px rgba(25,35,49,.04)'},
  segBtn:{width:'30px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'none',cursor:'pointer',position:'relative'},
  cBtn:{width:'32px',height:'32px',borderRadius:'8px',border:`1px solid ${systemColors.light['border-default']}`,backgroundColor:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0},
  splitBtn:{display:'flex',alignItems:'center',backgroundColor:systemColors.light['content-brand'],borderRadius:'18px',height:'32px',cursor:'pointer',overflow:'hidden'},

  // Insight chip — light bg with blue left accent, 48px tall, max 582px
  ins:{display:'flex',alignItems:'center',gap:`${spacing.B}px`,padding:`${spacing.C}px ${spacing.D}px`,backgroundColor:'#F6F8FF',borderRadius:'24px',border:`1px solid ${systemColors.light['background-information']}`,borderLeft:`3px solid ${systemColors.light['content-brand']}`,marginBottom:`${spacing.E}px`,fontSize:'14px',maxWidth:'582px',height:'48px',boxSizing:'border-box'},

  // Chart area
  cWrap:{display:'flex',flex:1,minHeight:'300px'},
  yCol:{display:'flex',alignItems:'flex-start',flexShrink:0,width:'52px'},
  yLbl:{writingMode:'vertical-rl',transform:'rotate(180deg)',fontSize:'11px',color:systemColors.light['content-secondary'],textAlign:'center',letterSpacing:'0.3px',paddingTop:'60px'},
  yVals:{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',textAlign:'right',paddingRight:`${spacing.B}px`,flex:1},
  plot:{flex:1,position:'relative',minHeight:'280px'},
  bars:{display:'flex',position:'absolute',inset:'0',alignItems:'flex-end',gap:'2px',padding:`0 ${spacing.A}px`,zIndex:1},

  // Toolbar — 64px wide, gray[10] bg, rounded left corners
  tb:{width:'64px',backgroundColor:'#F6F8FA',border:`1px solid ${systemColors.light['background-subtle']}`,borderTopLeftRadius:'8px',borderBottomLeftRadius:'8px',display:'flex',flexDirection:'column',flexShrink:0,overflow:'hidden'},
  tbI:{width:'64px',height:'48px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',border:'none',background:'none',padding:0},

  // Panel — 286px
  pn:{width:'286px',flexShrink:0,display:'flex',flexDirection:'column',borderLeft:`1px solid ${systemColors.light['background-subtle']}`,backgroundColor:'#fff'},
  pnH:{display:'flex',alignItems:'center',padding:`0 ${spacing.D}px`,height:'64px',borderBottom:`1px solid ${systemColors.light['background-subtle']}`,flexShrink:0},
  pnB:{flex:1,padding:`${spacing.D}px`,overflow:'auto'},

  // Suggestion cards — gray[10] bg, rounded 10px
  sgCard:{display:'flex',alignItems:'center',gap:`${spacing.C}px`,padding:`${spacing.C}px ${spacing.D}px ${spacing.C}px ${spacing.C}px`,borderRadius:'10px',backgroundColor:'#F6F8FA',border:'none',cursor:'pointer',textAlign:'left',width:'100%'},
  sgIcon:{width:'32px',height:'32px',borderRadius:'4px',backgroundColor:'#DBDFE7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,overflow:'hidden'},

  // Prompt
  pnF:{padding:`${spacing.D}px`,borderTop:`1px solid ${systemColors.light['background-subtle']}`,marginTop:'auto'},
  pnIn:{display:'flex',alignItems:'center',gap:`${spacing.B}px`,padding:`6px ${spacing.C}px`,borderRadius:'24px',border:`1px solid ${systemColors.light['background-subtle']}`,backgroundColor:'#F6F8FA'},
  pnInF:{flex:1,border:'none',background:'none',outline:'none',fontSize:'14px',color:'#1D232F',fontFamily:'inherit'},
  pnSend:{width:'28px',height:'28px',borderRadius:'50%',backgroundColor:systemColors.light['content-brand'],border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0},
};

export default ChartEditorAI;
