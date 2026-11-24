/* iPhone Club: proporciones de 78 imágenes originales de Drive.
 * Los valores contienen ancho, alto y recorte visible en píxeles.
 * Permite mostrar todos los teléfonos con altura aparente uniforme,
 * sin deformar los originales ni alterar sus colores.
 */
(function(){
'use strict';
const FRAMES={"11uqTbq47ylwGLbFO4pyf4YJ350ajf3Bk":[800,800,89,13,640,773],"1MejsDgSAgkEF43yv2KqMJzIT1gUVwCfu":[500,500,69,3,361,492],"1P7EcFlEnZABiehwJ-1IsP3Dz3lkx6ie4":[500,500,93,62,314,432],"1kWjhYAhaLZr0Teuilzttw6bDoltH2RKK":[456,547,64,94,327,447],"1hlLUx-AEORT_EMh3URmcmRTK8zzC_ASw":[500,500,75,13,352,481],"1gvx1nXiuXHcbX4KIn08VjW6Y552X74o3":[500,500,65,0,369,500],"1-d7T8UkIBHQeYwe4wh5a1PxxyiLdGl0W":[500,500,72,5,356,490],"1x4ixsGrnC9adMiDO5K5dbch3x-rO3p2B":[447,447,61,0,325,445],"1rDPAdOgfcnla9E0wGzFnoqraOxuZV070":[900,900,169,56,562,774],"1Ph7qc6kUdkC20QKs9iIe-fSUO1HpzQ8w":[459,543,67,93,324,444],"1Osd2heXnj14wqr2xWHA17xnIk0u3Ie1V":[411,486,60,83,292,398],"1nB4pJw5O7LFHXnEolhuzF-zyvLzkVRTc":[500,500,106,96,288,390],"1cYWcp9MhxKVaVY050-D_okM9ppfbbvpe":[500,500,75,13,351,481],"1E55Vc0vsrMtGzu_rUwOF7MmEEuQ4CiGx":[500,500,75,11,354,480],"1FH_YGHAZ-uQDPdXhzylfKXx5XjGZ8S-7":[500,500,105,46,295,401],"1HtN80SQzndry1HACkqsoZuHnRVpDXtJn":[500,500,112,61,285,387],"1gZzDI50369F9yxHi-BoJieIrhxcoX6b8":[384,520,0,0,257,519],"1D7qsMGv7xU9Gz83MDYw0Hj27rxRrzBb0":[500,500,127,101,246,334],"1I3WOa1pHk8VYqHH9Rur7z71CDQ_E6GNU":[500,500,75,9,351,477],"1ldWUOB3-ep3dM8GnglaQXt3N1ugJvfCl":[300,300,43,5,214,291],"1iJ8oaa8CKwaD_Oq3iNH9TaFEsxrdJv4d":[500,500,160,127,178,245],"1353U9MbFfW5F3klwEQDzc6u0cUaCV_xA":[500,500,88,29,324,442],"1IgP1NjK0Y8Z2-Y975ASjpnGQaRBKFe6f":[365,500,14,20,336,460],"1GqieiC9DwfZo3NC4nqlbMVoJIDnRIRS9":[500,500,116,91,268,366],"18zBx9WyH4VJJ9OZSNynXTUs5Dddjr-V-":[447,447,101,65,245,321],"1hauEFz9uoGUZyEOOsFyc7YCjo8yhhz6V":[500,500,55,1,391,498],"1OPZnvcoW4Nq6RL_m1MMjzKbq7PTnJTcM":[447,447,48,0,351,446],"1ZsAX3LDcg2kYfRxoEzCOySwuDFuP8wEo":[447,447,62,17,322,411],"1euIn0vCYOZ7ebpRcj5XANEtRWudOkYRL":[447,447,48,0,350,446],"1bm95iSal4ifurI1GaU8Z-PptsDpfhRAQ":[500,500,117,73,266,359],"1im10-fS-HWKj0tv70MxTtWQI-GuLc4kD":[433,577,0,0,433,577],"1hy2m3VLB-5sGm7O5_ODXCyvfYhy3uian":[547,365,154,32,233,307],"1D6ZNJ_az31uPhIPkwqW7PM2RO4Upl-2I":[447,447,55,0,337,446],"1AucVO6rJJBqTnJ0TekCsYxcRPxF05rkc":[500,500,76,21,344,457],"1eUiv-KrLosZtWH1yWyKF5OTegQ6vSVtH":[500,500,114,66,272,367],"1pe5pKtEdNJL741miDCPgJJycIUgBPhFi":[434,574,19,27,394,520],"1aQxHM0qUzL1nOnKnQtssbj5vgo30lllK":[447,447,82,47,282,352],"1zuvO99Rmq_e38n-xEQVO5UvgU38FLpuF":[500,500,92,53,316,394],"1cOh350R7aWrRwlm66QpsLyNpv8-gkgiI":[500,500,50,1,400,497],"1qWZnP0ysJXiZd9D_p8kvakYn1aOp5yWC":[447,447,92,76,263,323],"1rL0oey2e1kvwXW6NM3C7U1A9WoLbDk39":[447,447,109,87,229,301],"13xVupNC1nFKuQ4PVJuhhUkenLb-DJH-I":[690,362,224,33,243,318],"1ZRUxp6WKOI51C3vWIDer3_ogmfUQLlvD":[500,500,79,20,350,460],"1McjEmGnXNccXfCkjBCwEjL5DORVI-zqw":[500,500,125,107,250,327],"1lNX12Ijqw6SZARjCjirL4fW4V_TAYHty":[447,447,44,2,359,442],"1iNlZvJfF0Wk2gZla3NSiHwigNsbXsUJf":[500,500,113,97,274,337],"1XWUF9nMRbe60Y0xa3irY14TIVvWIkz8l":[447,447,100,86,247,302],"1sBVDzDRWLHOA8mFlIJKD-81v6bPC0RlA":[447,447,100,86,247,302],"1J7PNEXVTQYdbIchR0OHf_G6nKlfwNKC5":[500,500,64,2,372,497],"1t9BBbDRZ7WjixM0J_yne5vFGibgnDEQn":[500,500,74,20,350,460],"1y0bY2Jr8ffMfP7iWxe54CvIQqjgrAEjb":[500,500,62,19,376,461],"1MAhA551JigYIFdSq2ghkUjdq7vLlP-9-":[411,500,17,20,377,460],"1HUC9bXCVHNvtspAzUyAQyUsKY-ZKFxt5":[500,500,66,21,367,459],"1j6sbCjDsSV03qdwWDYeYfQq5MLcEdJAC":[500,500,66,20,366,459],"1H_vNsNbBc-uYsDnWYMgv1xWPwwg6SbqD":[500,500,64,20,372,459],"1RshGiDH0PuFlYW7cezgkjbHh2cxDVLq8":[500,500,66,20,367,460],"14FrbyPjtFvEY2ApY-Q5RV7xiRrnvUREP":[666,375,240,71,186,229],"1wke2r2uweEQ6ctzKHwFtcnixj_nP6TpZ":[447,447,58,17,332,412],"1Bh6Fdr26q4W8bbf7X2wlDYBpZGdHFZp-":[449,556,0,0,449,556],"1IgrVv64HE5n18WNTf6hpsnTp2NQ_iR0P":[447,447,99,76,249,309],"1qZSlV6pQt86h79kPi61-nJ_qinLqbLcu":[225,225,31,10,165,206],"1spLiW_l0ai8TvWDxPpX_KdUXs82QL_V-":[300,300,45,17,210,261],"1zXVPEQ13PnERXF2j3go4jyOxnP2VrU9c":[500,500,102,72,302,374],"1QcsFeCpjmbMV08drAIcL0fEl2R5emxF9":[500,500,117,100,266,330],"13PrTCq9bz_PFAhbxXtlpflKJ8PvvwapD":[500,500,117,100,267,330],"1zBwl1ldG4Ierb602wdABA3yfSdJHVmSY":[500,500,114,84,272,331],"1t5Bgm9sRWr5dWLk5130Y1_f2e3h_aRDG":[500,500,114,85,272,330],"1gJGoeJGFwqyNiui_I1cJn71Fa0Rv2tP4":[500,500,114,85,270,329],"11dinsAvScGaHTBZkIyjGe-JvF_K_0eBF":[500,500,92,52,316,392],"13e9zMXdSyG4Unk-KCmFvzQdd087XKaCn":[447,447,57,17,332,413],"1VSVRJwYR4CQWkQ5bEMR8IH94A-9WCjeD":[500,500,110,70,280,360],"1zQa32dEYwLC7Qh5BdwnV-tPaXqsMF3dh":[500,500,110,70,281,360],"1e-Mhgykozx3rIM-KjXG1UJMzyrwGNylZ":[560,445,150,63,261,321],"1e9X9xdtBBtr_wMTF2EXlq--urak2RqWz":[500,500,117,100,266,330],"16CiErbhxlXYhNwRrpymUTBKMJV964_jP":[257,399,5,36,248,334],"1JfJAILFHS7R-TiOzoTZsBmXdL9F7Ikdx":[593,593,64,11,468,570],"1FWC-47j6VxQvAbqgWegN3M1NnMDIqOxT":[500,500,79,35,362,438],"1z7puE1uc4SbWdWMVtcFM8IN9-OWPe9Q6":[350,350,30,0,290,350]};
const active=new Set();
let scheduled=false;
function getId(url){
  if(!url)return '';
  const x=String(url).match(/[?&]id=([A-Za-z0-9_-]+)/)||String(url).match(/\/d\/([A-Za-z0-9_-]+)/);
  return x?x[1]:'';
}
function update(img){
  if(!img||!img.isConnected||!img.naturalWidth||!img.naturalHeight)return;
  const frame=FRAMES[getId(img.currentSrc||img.src)];
  if(!frame){img.style.scale='';img.style.translate='';return;}
  const [sw,sh,x,y,bw,bh]=frame;
  const css=getComputedStyle(img);
  const boxW=img.clientWidth-(parseFloat(css.paddingLeft)||0)-(parseFloat(css.paddingRight)||0);
  const boxH=img.clientHeight-(parseFloat(css.paddingTop)||0)-(parseFloat(css.paddingBottom)||0);
  if(boxW<20||boxH<20)return;
  const nW=img.naturalWidth,nH=img.naturalHeight;
  const fit=Math.min(boxW/nW,boxH/nH);
  const contentW=(bw/sw)*nW*fit;
  const contentH=(bh/sh)*nH*fit;
  const z=Math.min((boxW*0.85)/contentW,(boxH*0.84)/contentH);
  if(!Number.isFinite(z)||z<=0)return;
  const dx=((x+bw/2)/sw-0.5)*nW*fit;
  const dy=((y+bh/2)/sh-0.5)*nH*fit;
  // CSS independent transforms keep the existing hover animation intact.
  img.style.scale=String(z);
  img.style.translate=(-z*dx).toFixed(2)+'px '+(-z*dy).toFixed(2)+'px';
}
function onResize(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;for(const img of active){if(!img.isConnected){active.delete(img);continue;}update(img)}});
}
window.iPhoneClubFitImage=function(img){
 if(!img||img.tagName!=='IMG')return;
 if(!FRAMES[getId(img.src)])return;
 if(active.has(img)){update(img);return;}
 active.add(img);
 img.addEventListener('load',()=>update(img));
 if(img.complete&&img.naturalWidth)requestAnimationFrame(()=>update(img));
 requestAnimationFrame(()=>update(img));
};
window.addEventListener('resize',onResize,{passive:true});
document.addEventListener('click',()=>{requestAnimationFrame(onResize)},{passive:true});
})();
