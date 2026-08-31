(() => {
  const song=(title,artist,videoId='')=>({title,artist,videoId});
  const norm=s=>String(s||'').trim().toLowerCase();
  function add(mood,genre,items){
    if(typeof musicData==='undefined'||!musicData[mood]||!Array.isArray(musicData[mood][genre]))return;
    const target=musicData[mood][genre];
    const seen=new Set(target.map(s=>`${norm(s.title)}|||${norm(s.artist)}`));
    items.forEach(([title,artist,videoId=''])=>{
      const k=`${norm(title)}|||${norm(artist)}`;
      if(!seen.has(k)){target.push(song(title,artist,videoId));seen.add(k);}
    });
  }

  add('행복','KPOP',[
    ['I AM','IVE'],['HEYA','IVE'],['Kitsch','IVE'],['FANCY','TWICE'],['YES or YES','TWICE'],['Heart Shaker','TWICE'],['Feel Special','TWICE'],['Talk that Talk','TWICE'],['Dynamite','BTS'],['Boy With Luv','BTS'],['Euphoria','Jung Kook'],['Hello Future','NCT DREAM'],['Beatbox','NCT DREAM'],['Candy','NCT DREAM'],['Queencard','(G)I-DLE'],['Super','SEVENTEEN'],['Pretty U','SEVENTEEN'],['God of Music','SEVENTEEN'],['Rollin’','Brave Girls'],['Nonstop','OH MY GIRL'],['DM','fromis_9'],['WE GO','fromis_9'],['After School','Weeekly'],['Poppy','STAYC'],['Hello','JOY']
  ]);
  add('행복','POP',[
    ['Levitating','Dua Lipa'],['Dance The Night','Dua Lipa'],['Espresso','Sabrina Carpenter'],['Feather','Sabrina Carpenter'],['As It Was','Harry Styles'],['Watermelon Sugar','Harry Styles'],['Treasure','Bruno Mars'],['24K Magic','Bruno Mars'],['Marry You','Bruno Mars'],['I Ain’t Worried','OneRepublic'],['Good 4 U','Olivia Rodrigo'],['Cruel Summer','Taylor Swift'],['Style','Taylor Swift'],['Paper Rings','Taylor Swift'],['Pocketful of Sunshine','Natasha Bedingfield'],['Unwritten','Natasha Bedingfield'],['Walking on a Dream','Empire of the Sun'],['Tongue Tied','Grouplove'],['Electric Love','BØRNS'],['Classic','MKTO'],['Safe and Sound','Capital Cities'],['Best Day of My Life','American Authors'],['Feel It Still','Portugal. The Man'],['Island in the Sun','Weezer'],['Dog Days Are Over','Florence + The Machine']
  ]);
  add('행복','INDIE',[
    ['Can I Call You Tonight?','Dayglow'],['Hot Rod','Dayglow'],['Every Summertime','NIKI'],['Loving Is Easy','Rex Orange County'],['Sunflower','Rex Orange County'],['Coffee','beabadoobee'],['the perfect pair','beabadoobee'],['Glue Song','beabadoobee'],['Dreams Tonite','Alvvays'],['Archie, Marry Me','Alvvays'],['Sweet to Me','Summer Salt'],['Revvin’ My Cj7','Summer Salt'],['Remember When','Wallows'],['Are You Bored Yet?','Wallows feat. Clairo'],['Lovers Rock','TV Girl'],['Brazil','Declan McKenna'],['Alrighty Aphrodite','Peach Pit'],['Shampoo Bottles','Peach Pit'],['Lover Boy','Phum Viphurit'],['Welcome Change','Phum Viphurit'],['Young','Vacations'],['Telephones','Vacations'],['Sunkissed','khai dreams'],['C U Girl','Steve Lacy'],['Dark Red','Steve Lacy']
  ]);

  add('사랑','KPOP',[
    ['Love Maze','BTS'],['Serendipity','Jimin'],['Euphoria','Jung Kook'],['Still With You','Jung Kook'],['Christmas Tree','V'],['Sweet Night','V'],['Darling','SEVENTEEN'],['Ready to love','SEVENTEEN'],['Pretty U','SEVENTEEN'],['Dream','Suzy & Baekhyun'],['Everytime','CHEN & Punch'],['Say Yes','Loco & Punch'],['Some','BOL4'],['Gift','MeloMance'],['ONLY','LEE HI'],['Love Me Like That','Sam Kim'],['Make Up','Sam Kim feat. Crush'],['Your Dog Loves You','Colde feat. Crush'],['When Dawn Comes Again','Colde feat. BAEKHYUN'],['Love Is a Beauty','NCT 127'],['Love 119','RIIZE'],['plot twist','TWS'],['Magnetic','ILLIT'],['Love Lee','AKMU'],['200%','AKMU']
  ]);
  add('사랑','POP',[
    ['Best Part','Daniel Caesar feat. H.E.R.'],['Japanese Denim','Daniel Caesar'],['Get You','Daniel Caesar feat. Kali Uchis'],['Nothing','Bruno Major'],['Easily','Bruno Major'],['Until I Found You','Stephen Sanchez'],['Beyond','Leon Bridges'],['Come Away With Me','Norah Jones'],['Make You Feel My Love','Adele'],['Turning Page','Sleeping At Last'],['You Are the Reason','Calum Scott'],['I Won’t Give Up','Jason Mraz'],['Adore You','Harry Styles'],['Lover','Taylor Swift'],['Enchanted','Taylor Swift'],['Love Story','Taylor Swift'],['Die With A Smile','Lady Gaga & Bruno Mars'],['Just the Way You Are','Bruno Mars'],['A Thousand Years','Christina Perri'],['All of Me','John Legend'],['Say You Won’t Let Go','James Arthur'],['I Like Me Better','Lauv'],['Dandelions','Ruth B.'],['Kiss Me','Sixpence None the Richer'],['Lucky','Jason Mraz & Colbie Caillat']
  ]);
  add('사랑','INDIE',[
    ['About You','The 1975'],['Fallingforyou','The 1975'],['Sweet','Cigarettes After Sex'],['K.','Cigarettes After Sex'],['Apocalypse','Cigarettes After Sex'],['Nothing’s Gonna Hurt You Baby','Cigarettes After Sex'],['From The Start','Laufey'],['Valentine','Laufey'],['Let You Break My Heart Again','Laufey'],['Pluto Projector','Rex Orange County'],['Best Friend','Rex Orange County'],['Lover Is a Day','Cuco'],['Lo Que Siento','Cuco'],['My Jinji','Sunset Rollercoaster'],['Bloom','The Paper Kites'],['Honeybee','The Head and the Heart'],['Only','RY X'],['Cariño','The Marías'],['No One Noticed','The Marías'],['I Don’t Know You','The Marías'],['Sofia','Clairo'],['Bags','Clairo'],['Pretty Girl','Clairo'],['Falling Behind','Laufey'],['Promise','Laufey']
  ]);

  add('슬픔','KPOP',[
    ['Breathe','LEE HI'],['HOLO','LEE HI'],['ONLY','LEE HI'],['Fine','TAEYEON'],['Time Lapse','TAEYEON'],['Dear Me','TAEYEON'],['Ending Scene','IU'],['Dear Name','IU'],['Love Poem','IU'],['How can I love the heartbreak, you’re the one I love','AKMU'],['Melted','AKMU'],['Missing You','BTOB'],['Beautiful Pain','BTOB'],['Lonely','JONGHYUN feat. TAEYEON'],['Y Si Fuera Ella','JONGHYUN'],['Zombie','DAY6'],['Afraid','DAY6'],['I Need Somebody','DAY6'],['You Were Beautiful','DAY6'],['Congratulations','DAY6'],['Instagram','DEAN'],['D (Half Moon)','DEAN'],['Control Me','Colde'],['WA-R-R','Colde'],['Try Again','d.ear & Jaehyun']
  ]);
  add('슬픔','POP',[
    ['The Night We Met','Lord Huron'],['Youth','Daughter'],['Smother','Daughter'],['Medicine','Daughter'],['Skinny Love','Bon Iver'],['re: Stacks','Bon Iver'],['Another Love','Tom Odell'],['Heal','Tom Odell'],['Jealous','Labrinth'],['All I Want','Kodaline'],['High Hopes','Kodaline'],['Chasing Cars','Snow Patrol'],['Run','Snow Patrol'],['Sparks','Coldplay'],['Fix You','Coldplay'],['Liability','Lorde'],['Writer in the Dark','Lorde'],['To Build a Home','The Cinematic Orchestra'],['Saturn','Sleeping At Last'],['I Found','Amber Run'],['Someone You Loved','Lewis Capaldi'],['Before You Go','Lewis Capaldi'],['Arcade','Duncan Laurence'],['Dancing With Your Ghost','Sasha Alex Sloan'],['Let Me Down Slowly','Alec Benjamin']
  ]);
  add('슬픔','INDIE',[
    ['Moon Song','Phoebe Bridgers'],['Funeral','Phoebe Bridgers'],['Scott Street','Phoebe Bridgers'],['Motion Sickness','Phoebe Bridgers'],['Fourth of July','Sufjan Stevens'],['Visions of Gideon','Sufjan Stevens'],['Should Have Known Better','Sufjan Stevens'],['Roslyn','Bon Iver & St. Vincent'],['Anchor','Novo Amor'],['Carry You','Novo Amor'],['Repeat Until Death','Novo Amor'],['No Surprises','Radiohead'],['Fake Plastic Trees','Radiohead'],['Videotape','Radiohead'],['Space Song','Beach House'],['Myth','Beach House'],['PPP','Beach House'],['Apocalypse','Cigarettes After Sex'],['Cry','Cigarettes After Sex'],['Touch','Cigarettes After Sex'],['Youth','Daughter'],['Lua','Bright Eyes'],['First Day of My Life','Bright Eyes'],['Medicine','Daughter'],['Smother','Daughter']
  ]);

  add('화남','KPOP',[
    ['UGH!','BTS'],['Daechwita','Agust D'],['Agust D','Agust D'],['Arson','j-hope'],['MORE','j-hope'],['Dionysus','BTS'],['S-Class','Stray Kids'],['LALALALA','Stray Kids'],['Chk Chk Boom','Stray Kids'],['District 9','Stray Kids'],['BOUNCY','ATEEZ'],['Crazy Form','ATEEZ'],['The Real','ATEEZ'],['Guerrilla','ATEEZ'],['WONDERLAND','ATEEZ'],['Kill This Love','BLACKPINK'],['Pretty Savage','BLACKPINK'],['I Am The Best','2NE1'],['HIT','SEVENTEEN'],['Simon Says','NCT 127'],['Kick It','NCT 127'],['Cherry Bomb','NCT 127'],['Savage','aespa'],['Drama','aespa'],['Super Lady','(G)I-DLE']
  ]);
  add('화남','POP',[
    ['Break Stuff','Limp Bizkit'],['Bodies','Drowning Pool'],['Duality','Slipknot'],['Before I Forget','Slipknot'],['Killing in the Name','Rage Against the Machine'],['Bulls on Parade','Rage Against the Machine'],['Chop Suey!','System of a Down'],['Toxicity','System of a Down'],['Faint','Linkin Park'],['Given Up','Linkin Park'],['Papercut','Linkin Park'],['Numb','Linkin Park'],['Animal I Have Become','Three Days Grace'],['I Hate Everything About You','Three Days Grace'],['Misery Business','Paramore'],['Ignorance','Paramore'],['you should see me in a crown','Billie Eilish'],['Therefore I Am','Billie Eilish'],['HUMBLE.','Kendrick Lamar'],['Lose Yourself','Eminem'],['Till I Collapse','Eminem'],['Centuries','Fall Out Boy'],['The Phoenix','Fall Out Boy'],['Radioactive','Imagine Dragons'],['Natural','Imagine Dragons']
  ]);
  add('화남','INDIE',[
    ['Do I Wanna Know?','Arctic Monkeys'],['R U Mine?','Arctic Monkeys'],['Brianstorm','Arctic Monkeys'],['505','Arctic Monkeys'],['Figure It Out','Royal Blood'],['Out of the Black','Royal Blood'],['Little Monster','Royal Blood'],['The Less I Know the Better','Tame Impala'],['Elephant','Tame Impala'],['Take a Slice','Glass Animals'],['Tokyo Drifting','Glass Animals feat. Denzel Curry'],['Wolf Like Me','TV on the Radio'],['Heads Will Roll','Yeah Yeah Yeahs'],['Date With The Night','Yeah Yeah Yeahs'],['Reptilia','The Strokes'],['Juicebox','The Strokes'],['Obstacle 1','Interpol'],['Evil','Interpol'],['Freaks','Surf Curse'],['Disco','Surf Curse'],['Sweet Dreams, TN','The Last Shadow Puppets'],['No. 1 Party Anthem','Arctic Monkeys'],['Why’d You Only Call Me When You’re High?','Arctic Monkeys'],['My Number','Foals'],['Inhaler','Foals']
  ]);

  add('피곤','KPOP',[
    ['WA-R-R','Colde'],['Your Dog Loves You','Colde feat. Crush'],['Control Me','Colde'],['Instagram','DEAN'],['D (Half Moon)','DEAN'],['dayfly','DEAN feat. Sulli & Rad Museum'],['Come Over','DEAN feat. Yerin Baek'],['Restless','BIBI'],['Restless','Meloh'],['NAPPA','Crush'],['Mayday','Crush feat. Joy'],['Sometimes','Crush'],['Square (2017)','Yerin Baek'],['Maybe It’s Not Our Fault','Yerin Baek'],['Bye bye my blue','Yerin Baek'],['0310','Yerin Baek'],['bath','offonoff'],['gold','offonoff'],['photograph','offonoff'],['Cigarette','offonoff feat. Tablo & MISO'],['homebody','pH-1'],['Oscar','pH-1 feat. Golden & BIG Naughty'],['Restless','BIBI'],['HANGANG','Hoody'],['Adios','Hoody']
  ]);
  add('피곤','POP',[
    ['Slow Dancing in a Burning Room','John Mayer'],['Gravity','John Mayer'],['Heartbreak Warfare','John Mayer'],['Like Real People Do','Hozier'],['Cherry Wine','Hozier'],['Nothing','Bruno Major'],['Easily','Bruno Major'],['Sanctuary','Joji'],['Glimpse of Us','Joji'],['Like You Do','Joji'],['Pink + White','Frank Ocean'],['Godspeed','Frank Ocean'],['Ivy','Frank Ocean'],['Lost','Frank Ocean'],['Talk Is Cheap','Chet Faker'],['Gold','Chet Faker'],['Warm on a Cold Night','HONNE'],['Location Unknown ◐','HONNE'],['La La Lost You','NIKI'],['lowkey','NIKI'],['Lose','NIKI'],['Every Summertime','NIKI'],['Best Part','Daniel Caesar feat. H.E.R.'],['Japanese Denim','Daniel Caesar'],['Streetcar','Daniel Caesar']
  ]);
  add('피곤','INDIE',[
    ['Show Me How','Men I Trust'],['Numb','Men I Trust'],['Tailwhip','Men I Trust'],['Lauren','Men I Trust'],['Sugar','Men I Trust'],['Apocalypse','Cigarettes After Sex'],['K.','Cigarettes After Sex'],['Sweet','Cigarettes After Sex'],['Nothing’s Gonna Hurt You Baby','Cigarettes After Sex'],['Heavenly','Cigarettes After Sex'],['Space Song','Beach House'],['Myth','Beach House'],['Take Care','Beach House'],['Intro','The xx'],['Angels','The xx'],['Crystalised','The xx'],['Sunsetz','Cigarettes After Sex'],['No One Noticed','The Marías'],['Cariño','The Marías'],['Hush','The Marías'],['Only in My Dreams','The Marías'],['Moonlight','Kali Uchis'],['Chamber of Reflection','Mac DeMarco'],['My Kind of Woman','Mac DeMarco'],['For the First Time','Mac DeMarco']
  ]);

  add('위로','KPOP',[
    ['Love Poem','IU'],['Dear Name','IU'],['Through the Night','IU'],['Breathe','LEE HI'],['HOLO','LEE HI'],['ONLY','LEE HI'],['00:00 (Zero O’Clock)','BTS'],['Magic Shop','BTS'],['Answer: Love Myself','BTS'],['Life Goes On','BTS'],['Hug','SEVENTEEN'],['Circles','SEVENTEEN'],['Kidult','SEVENTEEN'],['Zombie','DAY6'],['Time of Our Life','DAY6'],['To My Youth','BOL4'],['Good Day','IU'],['Palette','IU feat. G-DRAGON'],['People','Agust D'],['Blue Side','j-hope'],['Everythinggoes','RM feat. NELL'],['No.2','RM feat. parkjiyoon'],['Maybe It’s Not Our Fault','Yerin Baek'],['Square (2017)','Yerin Baek'],['When Dawn Comes Again','Colde feat. BAEKHYUN']
  ]);
  add('위로','POP',[
    ['Fix You','Coldplay'],['Yellow','Coldplay'],['The Scientist','Coldplay'],['Vienna','Billy Joel'],['Rainbow','Kacey Musgraves'],['Keep Your Head Up','Ben Howard'],['Holocene','Bon Iver'],['Skinny Love','Bon Iver'],['Saturn','Sleeping At Last'],['Turning Page','Sleeping At Last'],['Bloom','The Paper Kites'],['Anchor','Novo Amor'],['Carry You','Novo Amor'],['Orange Sky','Alexi Murdoch'],['Heartbeats','José González'],['To Build a Home','The Cinematic Orchestra'],['Somewhere Only We Know','Keane'],['The Night We Met','Lord Huron'],['I Won’t Give Up','Jason Mraz'],['Count on Me','Bruno Mars'],['Keep Holding On','Avril Lavigne'],['Shake It Out','Florence + The Machine'],['Dog Days Are Over','Florence + The Machine'],['Better Days','OneRepublic'],['Good Life','OneRepublic']
  ]);
  add('위로','INDIE',[
    ['Anchor','Novo Amor'],['Carry You','Novo Amor'],['Repeat Until Death','Novo Amor'],['Bloom','The Paper Kites'],['Featherstone','The Paper Kites'],['Holocene','Bon Iver'],['re: Stacks','Bon Iver'],['First Day of My Life','Bright Eyes'],['Should Have Known Better','Sufjan Stevens'],['Mystery of Love','Sufjan Stevens'],['Scott Street','Phoebe Bridgers'],['Garden Song','Phoebe Bridgers'],['Sofia','Clairo'],['Amoeba','Clairo'],['Show Me How','Men I Trust'],['Tailwhip','Men I Trust'],['My Jinji','Sunset Rollercoaster'],['Cinnamon','Pale Waves'],['Sweet Disposition','The Temper Trap'],['Heartbeats','José González'],['Home','Edward Sharpe & The Magnetic Zeros'],['Big Jet Plane','Angus & Julia Stone'],['Santa Monica Dream','Angus & Julia Stone'],['Only Love','Ben Howard'],['Old Pine','Ben Howard']
  ]);

  add('신남','KPOP',[
    ['Super','SEVENTEEN'],['HOT','SEVENTEEN'],['VERY NICE','SEVENTEEN'],['God of Music','SEVENTEEN'],['FANCY','TWICE'],['Dance The Night Away','TWICE'],['Talk that Talk','TWICE'],['I AM','IVE'],['Kitsch','IVE'],['After LIKE','IVE'],['Supernova','aespa'],['Spicy','aespa'],['Drama','aespa'],['Next Level','aespa'],['Queencard','(G)I-DLE'],['TOMBOY','(G)I-DLE'],['ANTIFRAGILE','LE SSERAFIM'],['EASY','LE SSERAFIM'],['Perfect Night','LE SSERAFIM'],['S-Class','Stray Kids'],['MANIAC','Stray Kids'],['BOUNCY','ATEEZ'],['WAVE','ATEEZ'],['JUMP','BLACKPINK'],['BANG BANG BANG','BIGBANG']
  ]);
  add('신남','POP',[
    ['Don’t Start Now','Dua Lipa'],['Levitating','Dua Lipa'],['Dance The Night','Dua Lipa'],['Uptown Funk','Mark Ronson feat. Bruno Mars'],['24K Magic','Bruno Mars'],['Treasure','Bruno Mars'],['Blinding Lights','The Weeknd'],['Can’t Feel My Face','The Weeknd'],['Shut Up and Dance','WALK THE MOON'],['Cake by the Ocean','DNCE'],['Rather Be','Clean Bandit feat. Jess Glynne'],['Wake Me Up','Avicii'],['The Nights','Avicii'],['On Top of the World','Imagine Dragons'],['I Gotta Feeling','The Black Eyed Peas'],['Good Time','Owl City & Carly Rae Jepsen'],['Call Me Maybe','Carly Rae Jepsen'],['Shake It Off','Taylor Swift'],['Cruel Summer','Taylor Swift'],['Espresso','Sabrina Carpenter'],['APT.','ROSÉ & Bruno Mars'],['Locked Out of Heaven','Bruno Mars'],['Starships','Nicki Minaj'],['DJ Got Us Fallin’ in Love','Usher feat. Pitbull'],['Dynamite','Taio Cruz']
  ]);
  add('신남','INDIE',[
    ['Electric Feel','MGMT'],['Kids','MGMT'],['Walking on a Dream','Empire of the Sun'],['Lisztomania','Phoenix'],['1901','Phoenix'],['A-Punk','Vampire Weekend'],['What You Know','Two Door Cinema Club'],['Undercover Martyn','Two Door Cinema Club'],['Take a Walk','Passion Pit'],['Sleepyhead','Passion Pit'],['Tongue Tied','Grouplove'],['Pumped Up Kicks','Foster the People'],['Sit Next to Me','Foster the People'],['Brazil','Declan McKenna'],['Can I Call You Tonight?','Dayglow'],['Hot Rod','Dayglow'],['Supalonely','BENEE'],['Lovers Rock','TV Girl'],['Taking What’s Not Yours','TV Girl'],['Young Folks','Peter Bjorn and John'],['Sweet Disposition','The Temper Trap'],['Mountain at My Gates','Foals'],['My Number','Foals'],['Chelsea Dagger','The Fratellis'],['Are You Gonna Be My Girl','Jet']
  ]);

  add('SHARK','KPOP',[
    ['Instagram','DEAN'],['D (Half Moon)','DEAN'],['dayfly','DEAN feat. Sulli & Rad Museum'],['Come Over','DEAN feat. Yerin Baek'],['WA-R-R','Colde'],['Your Dog Loves You','Colde feat. Crush'],['Control Me','Colde'],['When Dawn Comes Again','Colde feat. BAEKHYUN'],['bath','offonoff'],['gold','offonoff'],['photograph','offonoff'],['Cigarette','offonoff feat. Tablo & MISO'],['Square (2017)','Yerin Baek'],['0310','Yerin Baek'],['Maybe It’s Not Our Fault','Yerin Baek'],['Bye bye my blue','Yerin Baek'],['Restless','BIBI'],['Kazino','BIBI'],['NAPPA','Crush'],['Sometimes','Crush'],['HANGANG','Hoody'],['Adios','Hoody'],['Different','WOODZ'],['Pool','WOODZ feat. Sumin'],['No Blueberries','DPR IAN feat. DPR LIVE & CL']
  ]);
  add('SHARK','POP',[
    ['Pink + White','Frank Ocean'],['Ivy','Frank Ocean'],['Lost','Frank Ocean'],['Godspeed','Frank Ocean'],['Japanese Denim','Daniel Caesar'],['Get You','Daniel Caesar feat. Kali Uchis'],['Best Part','Daniel Caesar feat. H.E.R.'],['Streetcar','Daniel Caesar'],['Sanctuary','Joji'],['Slow Dancing in the Dark','Joji'],['Like You Do','Joji'],['Glimpse of Us','Joji'],['Moonlight','Kali Uchis'],['telepatía','Kali Uchis'],['After Dark','Mr.Kitty'],['Warm on a Cold Night','HONNE'],['Location Unknown ◐','HONNE'],['Talk Is Cheap','Chet Faker'],['Gold','Chet Faker'],['Tadow','Masego & FKJ'],['Ylang Ylang','FKJ'],['Skyline','FKJ'],['La La Lost You','NIKI'],['lowkey','NIKI'],['Oceans & Engines','NIKI'],['Every Summertime','NIKI'],['Redbone','Childish Gambino'],['Feels Like Summer','Childish Gambino'],['Borderline','Tame Impala'],['The Less I Know the Better','Tame Impala']
  ]);
  add('SHARK','INDIE',[
    ['love.','wave to earth','Q49pnA4jsp8'],['peach eyes','wave to earth'],['sunny days','wave to earth'],['Surf.','wave to earth'],['wave','wave to earth'],['nouvelle vague','wave to earth'],['pueblo','wave to earth'],['calla','wave to earth'],['light','wave to earth'],['pink','wave to earth'],
    ['Show Me How','Men I Trust','OZRYzH0Q0pU'],['Numb','Men I Trust','xAz_DzPUjrM'],['Tailwhip','Men I Trust'],['Lauren','Men I Trust'],['Sugar','Men I Trust'],['Seven','Men I Trust'],['Norton Commander (All We Need)','Men I Trust'],['Tree Among Shrubs','Men I Trust'],
    ['No One Noticed','The Marías'],['Cariño','The Marías'],['Hush','The Marías'],['Only in My Dreams','The Marías'],['I Don’t Know You','The Marías'],['Heavy','The Marías'],['Over the Moon','The Marías'],['All I Really Want Is You','The Marías'],
    ['Apocalypse','Cigarettes After Sex'],['K.','Cigarettes After Sex'],['Sweet','Cigarettes After Sex'],['Nothing’s Gonna Hurt You Baby','Cigarettes After Sex'],['Heavenly','Cigarettes After Sex'],['Sunsetz','Cigarettes After Sex'],['Cry','Cigarettes After Sex'],['Touch','Cigarettes After Sex'],
    ['Space Song','Beach House'],['Myth','Beach House'],['PPP','Beach House'],['Take Care','Beach House'],['Silver Soul','Beach House'],['Lazuli','Beach House'],['Master of None','Beach House'],
    ['Intro','The xx'],['Angels','The xx'],['Crystalised','The xx'],['VCR','The xx'],['Chained','The xx'],['On Hold','The xx'],
    ['Chamber of Reflection','Mac DeMarco'],['My Kind of Woman','Mac DeMarco'],['For the First Time','Mac DeMarco'],['Salad Days','Mac DeMarco'],['Heart to Heart','Mac DeMarco'],['Moonlight on the River','Mac DeMarco'],
    ['Sofia','Clairo'],['Bags','Clairo'],['Amoeba','Clairo'],['Pretty Girl','Clairo'],['4EVER','Clairo'],['Juna','Clairo'],
    ['Lovers Rock','TV Girl'],['Taking What’s Not Yours','TV Girl'],['Not Allowed','TV Girl'],['Cigarettes out the Window','TV Girl'],['Blue Hair','TV Girl'],
    ['Dark Red','Steve Lacy'],['C U Girl','Steve Lacy'],['Some','Steve Lacy'],['Bad Habit','Steve Lacy'],
    ['My Jinji','Sunset Rollercoaster'],['Candlelight','Sunset Rollercoaster'],['Vanilla','Sunset Rollercoaster'],['Summum Bonum','Sunset Rollercoaster'],
    ['Can I Call You Tonight?','Dayglow'],['Hot Rod','Dayglow'],['Close to You','Dayglow'],['Run the World!!!','Dayglow'],
    ['Alrighty Aphrodite','Peach Pit'],['Shampoo Bottles','Peach Pit'],['Tommy’s Party','Peach Pit'],['Seventeen','Peach Pit'],
    ['Dreams Tonite','Alvvays'],['Archie, Marry Me','Alvvays'],['Adult Diversion','Alvvays'],['In Undertow','Alvvays'],
    ['Freaks','Surf Curse'],['Disco','Surf Curse'],['Heathers','Surf Curse'],['Forever Dumb','Surf Curse'],
    ['505','Arctic Monkeys'],['No. 1 Party Anthem','Arctic Monkeys'],['Why’d You Only Call Me When You’re High?','Arctic Monkeys'],['I Wanna Be Yours','Arctic Monkeys'],
    ['Glue Song','beabadoobee'],['the perfect pair','beabadoobee'],['Coffee','beabadoobee'],['Cologne','beabadoobee'],['Apple Cider','beabadoobee'],
    ['Lover Boy','Phum Viphurit'],['Hello, Anxiety','Phum Viphurit'],['Welcome Change','Phum Viphurit'],['Long Gone','Phum Viphurit'],
    ['Wi Ing Wi Ing','HYUKOH'],['TOMBOY','HYUKOH'],['Gondry','HYUKOH'],['Comes And Goes','HYUKOH'],['Wanli','HYUKOH'],
    ['EVERYTHING','The Black Skirts'],['Hollywood','The Black Skirts'],['Who Do You Love','The Black Skirts'],['Dientes','The Black Skirts'],['Antifreeze','The Black Skirts'],
    ['난춘','SE SO NEON'],['긴 꿈','SE SO NEON'],['파도','SE SO NEON'],['joke!','SE SO NEON'],
    ['Dandelion','OOHYO'],['Pizza','OOHYO'],['Youth','OOHYO'],['Teddy Bear Rises','OOHYO'],
    ['gold','offonoff'],['bath','offonoff'],['photograph','offonoff'],['Cigarette','offonoff feat. Tablo & MISO'],
    ['lovememore.','dosii'],['orbit of yours','dosii'],['fairy of shampoo','dosii'],['underwater','dosii'],
    ['So Beautiful','DPR IAN'],['Nerves','DPR IAN'],["Don't Go Insane",'DPR IAN'],['Mood','DPR IAN'],['Scaredy Cat','DPR IAN'],['Peanut Butter & Tears','DPR IAN'],
    ['Lily of the Valley','Daniel'],['Who Are You','Daniel'],['Blue','Daniel'],['One More Night','Daniel'],
    ['Okinawa','92914'],['Koh','92914'],['Sunset','92914'],['Starlight','92914'],
    ['Dry Flower','SURL'],['Snow','SURL'],['Cilla','SURL'],['The Lights Behind You','SURL'],
    ['Dancing in the Rain','Lacuna'],['Far Away','Lacuna'],['You','Lacuna'],['Hello, Wonderland','Lacuna'],
    ['Bird','OurR'],['haaAakkKKK!!!','OurR'],['Floor','OurR'],['Swing','OurR'],
    ['Insomnia','Dvwn'],['Last','Dvwn'],['fairy','Dvwn'],['Phobia','Dvwn']
  ]);
})();