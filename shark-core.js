(() => {
  const DIRECT = new Map([
    ['butter|||bts','WMweEpGlu_U'],['permission to dance|||bts','CuklIb9d3fI'],['dynamite|||bts','gdZLi9oWNZg'],['sunday morning|||maroon 5','S2Cti12XBw4'],['sugar|||maroon 5','09R8_2nJtjg'],['dandelion|||oohyo','Kaq4LFM47I0'],['comes and goes|||hyukoh','ECMc1SB60E0'],['love wins all|||iu','JleoAppaxi0'],['밤편지|||iu','BzYnNdJhZQw'],['through the night|||iu','BzYnNdJhZQw'],['love poem|||iu','iOKRYIMhaDk'],['attention|||newjeans','js1CtxSY38I'],['ditto|||newjeans','pSUydWEqKwE'],['perfect|||ed sheeran','2Vv-BfVoq4g'],['thinking out loud|||ed sheeran','lp-EO5I60KA'],['bad|||wave to earth','6Q5xqNkCk7w'],['seasons|||wave to earth','CnVVjLOGVoY'],['love.|||wave to earth','Q49pnA4jsp8'],['show me how|||men i trust','OZRYzH0Q0pU'],['numb|||men i trust','xAz_DzPUjrM'],['beige coat|||그리즐리(grizzly)','pptGFwvvo8g'],['beautiful goodbye|||chen','JrOrlhjIYVk'],['untitled, 2014|||g-dragon','Nged3LwJsvQ'],['let her go|||passenger','RBumgq5yVrA'],['drivers license|||olivia rodrigo','ZmDBbnmKpqQ'],['기억을 걷는 시간|||nell','K72ZxP9ZAP4'],['space song|||beach house','RBtlPT23PTM'],["god's menu|||stray kids",'TQTlCHxyuu8'],['maniac|||stray kids','OvioeS1ZZ7o'],['believer|||imagine dragons','7wtfhZwyrcc'],['natural|||imagine dragons','0I647GU3Jsc'],['do i wanna know?|||arctic monkeys','bpOSxM0rNPM'],['seven nation army|||the white stripes','0J2QdDbelmY'],['golden hour|||jvke','PEM0Vs8jf1w'],['comethru|||jeremy zucker','jO2viLEW-1A'],['instagram|||dean','wKyMIrBClYw'],['d (half moon)|||dean','eelfrHtmk68'],['fix you|||coldplay','k4V3Mo61fJM'],['yellow|||coldplay','yKNxeF4KMsY'],['for lovers who hesitate|||jannabi','GpQ222I1ULc'],['apt.|||rosé & bruno mars','ekr2nIex040'],['uptown funk|||mark ronson feat. bruno mars','OPf0YbXqDm0'],["don't start now|||dua lipa",'oygrmJFKYZY'],['phonecert|||10cm','mOo8bVzN9M8'],['wave|||ateez','FIInyEWWW-s'],['ocean view|||rothy','5wiW60inhgw'],['ocean eyes|||billie eilish','viimfQi_pUw'],['ocean|||martin garrix feat. khalid','BDocp-VpCwY']
  ]);

  const KEYS={
    playlist:'sharkPlaylist',
    recent:'sharkRecentPlaysV1',
    history:'sharkRecommendationHistoryV8',
    last:'sharkLastRecommendationsV8'
  };

  const emoji={행복:'😊',사랑:'💗',슬픔:'😢',화남:'😡',피곤:'😴',위로:'🥺',신남:'🤩',SHARK:'🦈'};
  const message={행복:'기분을 더 밝게 만들어줄 노래를 골라봤어.',사랑:'설레는 마음에 어울리는 노래를 골라봤어.',슬픔:'조용히 감정에 머물 수 있는 노래를 골라봤어.',화남:'답답한 기분을 시원하게 날려줄 노래를 골라봤어.',피곤:'힘을 빼고 편하게 들을 수 있는 노래를 골라봤어.',위로:'오늘 너에게 따뜻하게 닿을 노래를 골라봤어.',신남:'지금 에너지를 더 끌어올릴 노래를 골라봤어.',SHARK:'몽환적인 바다와 새벽 드라이브에 어울리는 노래를 골라봤어.'};

  const key=s=>`${String(s?.title||'').trim().toLowerCase()}|||${String(s?.artist||'').trim().toLowerCase()}`;
  const artistKey=s=>String(s?.artist||'').trim().toLowerCase();
  const audioIds=()=>window.SHARK_AUDIO_IDS||{};
  const videoIds=()=>window.SHARK_VIDEO_IDS||window.SHARK_DIRECT_IDS||{};
  const audioId=s=>String(audioIds()[key(s)]||'').trim();
  const fallbackVideoId=s=>String(s?.videoId||'').trim()||videoIds()[key(s)]||DIRECT.get(key(s))||'';
  const videoId=s=>audioId(s)||fallbackVideoId(s);
  const linkKind=s=>audioId(s)?'audio':fallbackVideoId(s)?'video':'search';
  const hasExactLink=s=>linkKind(s)!=='search';
  const searchQuery=s=>`${String(s?.title||'').trim()} ${String(s?.artist||'').trim()}`.trim();
  const exactUrl=s=>{const id=videoId(s);return id?`https://music.youtube.com/watch?v=${encodeURIComponent(id)}`:''};
  const searchUrl=s=>`https://music.youtube.com/search?q=${encodeURIComponent(searchQuery(s))}`;
  const url=s=>exactUrl(s)||searchUrl(s);

  const parse=(storage,k,fallback)=>{try{const v=JSON.parse(storage.getItem(k)||'');return v??fallback}catch{return fallback}};
  const getData=()=>{try{return typeof musicData!=='undefined'?musicData:(window.musicData||{})}catch{return window.musicData||{}}};

  const loadSaved=()=>{const v=parse(localStorage,KEYS.playlist,[]);return Array.isArray(v)?v:[]};
  const saveSaved=v=>localStorage.setItem(KEYS.playlist,JSON.stringify(v));
  const toggleSaved=s=>{
    let a=loadSaved();
    const k=key(s),i=a.findIndex(x=>key(x)===k);
    if(i>=0)a.splice(i,1);
    else a.unshift({title:s.title,artist:s.artist,videoId:videoId(s),url:url(s),savedAt:Date.now()});
    saveSaved(a);
    return a;
  };
  const isSaved=s=>loadSaved().some(x=>key(x)===key(s));

  const loadRecent=()=>{const v=parse(localStorage,KEYS.recent,[]);return Array.isArray(v)?v:[]};
  const saveRecent=v=>localStorage.setItem(KEYS.recent,JSON.stringify(Array.isArray(v)?v:[]));
  const removeRecent=s=>{
    const target=key(s);
    const next=loadRecent().filter(x=>key(x)!==target);
    saveRecent(next);
    return next;
  };
  const clearRecent=()=>{saveRecent([]);return[]};
  const recordPlay=(s,mood='',genre='')=>{
    const item={title:s.title,artist:s.artist,videoId:videoId(s),url:url(s),mood,genre,playedAt:Date.now(),linkKind:linkKind(s)};
    const rest=loadRecent().filter(x=>key(x)!==key(s));
    saveRecent([item,...rest].slice(0,50));
    return item;
  };
  const open=(s,mood='',genre='')=>{
    recordPlay(s,mood,genre);
    const id=videoId(s),target=exactUrl(s);
    if(id&&target){
      if(/Android/i.test(navigator.userAgent||'')){
        const fallback=encodeURIComponent(target);
        location.href=`intent://music.youtube.com/watch?v=${encodeURIComponent(id)}#Intent;scheme=https;package=com.google.android.apps.youtube.music;S.browser_fallback_url=${fallback};end`;
      }else location.href=target;
      return linkKind(s);
    }
    location.href=searchUrl(s);
    return 'search';
  };

  const unique=list=>{
    const seen=new Set(),out=[];
    for(const s of list){const k=key(s);if(k!=='|||'&&!seen.has(k)){seen.add(k);out.push(s)}}
    return out;
  };

  const poolFor=(mood,genre)=>{
    const d=getData()?.[mood];
    if(!d)return[];
    return unique(genre==='ALL'?[...(d.KPOP||[]),...(d.POP||[]),...(d.INDIE||[])]:[...(d[genre]||[])]);
  };

  const allSongs=()=>{
    const data=getData(),out=[];
    Object.entries(data||{}).forEach(([mood,genres])=>{
      ['KPOP','POP','INDIE'].forEach(genre=>{
        (genres?.[genre]||[]).forEach(s=>out.push({...s,__mood:mood,__genre:genre}));
      });
    });
    return unique(out);
  };

  const likedArtistCounts=()=>{
    const counts=new Map();
    loadSaved().forEach(s=>{const a=artistKey(s);if(a)counts.set(a,(counts.get(a)||0)+1)});
    return counts;
  };

  const weightedOrder=list=>{
    const likes=likedArtistCounts();
    return list.map(s=>{
      const artistBoost=(likes.get(artistKey(s))||0)*2.2;
      const savedBoost=isSaved(s)?0.9:0;
      const exactBoost=hasExactLink(s)?0.35:0;
      const audioBoost=linkKind(s)==='audio'?0.35:0;
      const score=Math.random()*(1+artistBoost+savedBoost)+exactBoost+audioBoost;
      return {s,score};
    }).sort((a,b)=>b.score-a.score).map(x=>x.s);
  };

  const pickDiverse=(ordered,count,maxPerArtist=1)=>{
    const out=[],used=new Set(),artistCounts=new Map();
    for(const s of ordered){
      const k=key(s),a=artistKey(s),n=artistCounts.get(a)||0;
      if(!used.has(k)&&n<maxPerArtist){out.push(s);used.add(k);artistCounts.set(a,n+1);if(out.length>=count)return out;}
    }
    for(const s of ordered){
      const k=key(s);if(!used.has(k)){out.push(s);used.add(k);if(out.length>=count)break;}
    }
    return out;
  };

  const loadObj=k=>{const v=parse(localStorage,k,{});return v&&typeof v==='object'&&!Array.isArray(v)?v:{}};
  const saveObj=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

  const recommend=(mood,genre,count=5,exclude=[])=>{
    const pool=poolFor(mood,genre);
    if(!pool.length)return[];
    const id=`${mood}_${genre}`;
    const hist=loadObj(KEYS.history),last=loadObj(KEYS.last);
    let seen=new Set(hist[id]||[]);
    const excluded=new Set(exclude.map(key));
    let fresh=pool.filter(s=>!seen.has(key(s))&&!excluded.has(key(s)));
    if(fresh.length<count){
      const lastSet=new Set(last[id]||[]);
      fresh=pool.filter(s=>!lastSet.has(key(s))&&!excluded.has(key(s)));
      seen=new Set();
    }
    if(fresh.length<count)fresh=pool.filter(s=>!excluded.has(key(s)));
    const selected=pickDiverse(weightedOrder(fresh),Math.min(count,fresh.length),1);
    selected.forEach(s=>seen.add(key(s)));
    hist[id]=[...seen].slice(-900);
    last[id]=selected.map(key);
    saveObj(KEYS.history,hist);saveObj(KEYS.last,last);
    return selected;
  };

  const five=(mood,genre)=>recommend(mood,genre,5,[]);

  const similar=(seed,mood,genre,count=5,exclude=[])=>{
    const current=poolFor(mood,genre).map(s=>({...s,__mood:mood,__genre:genre}));
    const universe=unique([...current,...allSongs()]);
    const excluded=new Set([key(seed),...exclude.map(key)]);
    const seedArtist=artistKey(seed),likes=likedArtistCounts();
    const ordered=universe
      .filter(s=>!excluded.has(key(s)))
      .map(s=>{
        let score=Math.random()*2;
        if(artistKey(s)===seedArtist)score+=11;
        if(s.__mood===mood)score+=5;
        if(genre==='ALL'||s.__genre===genre)score+=4;
        score+=(likes.get(artistKey(s))||0)*1.4;
        if(hasExactLink(s))score+=0.4;
        if(linkKind(s)==='audio')score+=0.35;
        return {s,score};
      })
      .sort((a,b)=>b.score-a.score)
      .map(x=>x.s);
    return pickDiverse(ordered,count,2);
  };

  const resetRecommendationHistory=()=>{localStorage.removeItem(KEYS.history);localStorage.removeItem(KEYS.last)};

  window.SHARK={emoji,message,key,audioId,videoId,linkKind,hasExactLink,exactUrl,searchUrl,url,loadSaved,saveSaved,toggleSaved,isSaved,loadRecent,saveRecent,removeRecent,clearRecent,recordPlay,open,recommend,five,similar,resetRecommendationHistory,poolFor};
})();
