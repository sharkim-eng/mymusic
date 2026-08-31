(() => {
  const song = (title, artist) => ({ title, artist, videoId: '' });

  function add(mood, genre, songs) {
    if (typeof musicData === 'undefined' || !musicData[mood] || !Array.isArray(musicData[mood][genre])) return;
    const target = musicData[mood][genre];
    const existing = new Set(target.map(s => `${String(s.title || '').trim().toLowerCase()}|||${String(s.artist || '').trim().toLowerCase()}`));
    songs.forEach(([title, artist]) => {
      const key = `${title.trim().toLowerCase()}|||${artist.trim().toLowerCase()}`;
      if (!existing.has(key)) {
        target.push(song(title, artist));
        existing.add(key);
      }
    });
  }

  add('행복', 'KPOP', [
    ['What Is Love?', 'TWICE'], ['LIKEY', 'TWICE'], ['Heart Shaker', 'TWICE'], ['Talk that Talk', 'TWICE'],
    ['Russian Roulette', 'Red Velvet'], ['Queendom', 'Red Velvet'], ['Umpah Umpah', 'Red Velvet'], ['Feel My Rhythm', 'Red Velvet'],
    ['We Young', 'NCT DREAM'], ['Beatbox', 'NCT DREAM'], ['Best Friend Ever', 'NCT DREAM'], ['Hello', 'JOY'],
    ['Rollin\'', 'Brave Girls'], ['Nonstop', 'OH MY GIRL'], ['BUNGEE', 'OH MY GIRL'], ['DM', 'fromis_9'],
    ['WE GO', 'fromis_9'], ['Up!', 'Kep1er'], ['After School', 'Weeekly'], ['Poppy', 'STAYC']
  ]);

  add('행복', 'POP', [
    ['Best Day of My Life', 'American Authors'], ['Walking on a Dream', 'Empire of the Sun'], ['Tongue Tied', 'Grouplove'],
    ['Electric Love', 'BØRNS'], ['Classic', 'MKTO'], ['Safe and Sound', 'Capital Cities'], ['Geronimo', 'Sheppard'],
    ['Rude', 'MAGIC!'], ['Budapest', 'George Ezra'], ['Feel It Still', 'Portugal. The Man'], ['Good Vibrations', 'The Beach Boys'],
    ['Island in the Sun', 'Weezer'], ['Dreams', 'The Cranberries'], ['Send Me On My Way', 'Rusted Root'], ['Dog Days Are Over', 'Florence + The Machine'],
    ['Lovely Day', 'Bill Withers'], ['September', 'Earth, Wind & Fire'], ['You Make My Dreams', 'Daryl Hall & John Oates'],
    ['Accidentally in Love', 'Counting Crows'], ['Home', 'Edward Sharpe & The Magnetic Zeros']
  ]);

  add('행복', 'INDIE', [
    ['Can I Call You Tonight?', 'Dayglow'], ['Hot Rod', 'Dayglow'], ['Coffee', 'beabadoobee'], ['the perfect pair', 'beabadoobee'],
    ['Loving Is Easy', 'Rex Orange County'], ['Sunflower', 'Rex Orange County'], ['Every Summertime', 'NIKI'], ['Supalonely', 'BENEE'],
    ['Alrighty Aphrodite', 'Peach Pit'], ['Shampoo Bottles', 'Peach Pit'], ['Brazil', 'Declan McKenna'], ['Why Do You Feel So Down', 'Declan McKenna'],
    ['Dreams Tonite', 'Alvvays'], ['Archie, Marry Me', 'Alvvays'], ['Sweet to Me', 'Summer Salt'], ['Revvin\' My Cj7', 'Summer Salt'],
    ['Lovers Rock', 'TV Girl'], ['Taking What\'s Not Yours', 'TV Girl'], ['Are You Bored Yet?', 'Wallows feat. Clairo'], ['Remember When', 'Wallows']
  ]);

  add('사랑', 'KPOP', [
    ['Dream', 'Suzy & Baekhyun'], ['Perhaps Love', 'HowL & J'], ['Love Day', 'Yang Yoseob & Jung Eunji'], ['Some', 'BOL4'],
    ['Only Then', 'Roy Kim'], ['Gift', 'MeloMance'], ['Love, ing', 'Ben'], ['Beautiful', 'Crush'],
    ['Everytime', 'CHEN & Punch'], ['Say Yes', 'Loco & Punch'], ['All For You', 'Seo In Guk & Jung Eunji'], ['Love Belt', 'JONGHYUN feat. Younha'],
    ['Love Maze', 'BTS'], ['Euphoria', 'Jung Kook'], ['Serendipity', 'Jimin'], ['Darling', 'SEVENTEEN'],
    ['Pretty U', 'SEVENTEEN'], ['Ready to love', 'SEVENTEEN'], ['Sweet Night', 'V'], ['Christmas Tree', 'V']
  ]);

  add('사랑', 'POP', [
    ['Yellow', 'Coldplay'], ['L-O-V-E', 'Nat King Cole'], ['Make You Feel My Love', 'Adele'], ['Kiss Me More', 'Doja Cat feat. SZA'],
    ['Best Part', 'Daniel Caesar feat. H.E.R.'], ['Japanese Denim', 'Daniel Caesar'], ['Nothing', 'Bruno Major'], ['Easily', 'Bruno Major'],
    ['Beyond', 'Leon Bridges'], ['Until I Found You', 'Stephen Sanchez'], ['Glue Song', 'beabadoobee'], ['Love Someone', 'Lukas Graham'],
    ['Turning Page', 'Sleeping At Last'], ['You Are the Reason', 'Calum Scott'], ['Like I\'m Gonna Lose You', 'Meghan Trainor feat. John Legend'],
    ['I Won\'t Give Up', 'Jason Mraz'], ['Come Away With Me', 'Norah Jones'], ['Falling Like The Stars', 'James Arthur'],
    ['A Sky Full of Stars', 'Coldplay'], ['Lucky Strike', 'Troye Sivan']
  ]);

  add('사랑', 'INDIE', [
    ['Nothing', 'Bruno Major'], ['Easily', 'Bruno Major'], ['Best Friend', 'Rex Orange County'], ['Pluto Projector', 'Rex Orange County'],
    ['You', 'LANY'], ['ILYSB', 'LANY'], ['Fallingforyou', 'The 1975'], ['About You', 'The 1975'],
    ['Sweet', 'Cigarettes After Sex'], ['K.', 'Cigarettes After Sex'], ['Coffee', 'beabadoobee'], ['Glue Song', 'beabadoobee'],
    ['From The Start', 'Laufey'], ['Let You Break My Heart Again', 'Laufey'], ['Only', 'RY X'], ['Bloom', 'The Paper Kites'],
    ['Honeybee', 'The Head and the Heart'], ['Lover Is a Day', 'Cuco'], ['Lo Que Siento', 'Cuco'], ['My Jinji', 'Sunset Rollercoaster']
  ]);

  add('슬픔', 'KPOP', [
    ['Missing You', 'BTOB'], ['Beautiful Pain', 'BTOB'], ['Downpour', 'I.O.I'], ['Lonely', 'JONGHYUN feat. TAEYEON'],
    ['Y Si Fuera Ella', 'JONGHYUN'], ['Goodbye', 'WENDY'], ['Fine', 'TAEYEON'], ['Time Lapse', 'TAEYEON'],
    ['Dear Me', 'TAEYEON'], ['Ending Scene', 'IU'], ['Dear Name', 'IU'], ['Love Poem', 'IU'],
    ['Breathe', 'LEE HI'], ['ONLY', 'LEE HI'], ['HOLO', 'LEE HI'], ['How can I love the heartbreak, you\'re the one I love', 'AKMU'],
    ['Melted', 'AKMU'], ['I Need Somebody', 'DAY6'], ['Afraid', 'DAY6'], ['Zombie', 'DAY6']
  ]);

  add('슬픔', 'POP', [
    ['Skinny Love', 'Bon Iver'], ['Youth', 'Daughter'], ['Smother', 'Daughter'], ['Medicine', 'Daughter'], ['Another Love', 'Tom Odell'],
    ['Heal', 'Tom Odell'], ['Jealous', 'Labrinth'], ['All I Want', 'Kodaline'], ['High Hopes', 'Kodaline'], ['The Night We Met', 'Lord Huron'],
    ['I Found', 'Amber Run'], ['Run', 'Snow Patrol'], ['Chasing Cars', 'Snow Patrol'], ['Fix You', 'Coldplay'], ['Sparks', 'Coldplay'],
    ['Liability', 'Lorde'], ['Writer in the Dark', 'Lorde'], ['I Can\'t Make You Love Me', 'Bonnie Raitt'], ['To Build a Home', 'The Cinematic Orchestra'], ['Saturn', 'Sleeping At Last']
  ]);

  add('슬픔', 'INDIE', [
    ['Youth', 'Daughter'], ['Smother', 'Daughter'], ['Lua', 'Bright Eyes'], ['First Day of My Life', 'Bright Eyes'],
    ['Fourth of July', 'Sufjan Stevens'], ['Visions of Gideon', 'Sufjan Stevens'], ['Should Have Known Better', 'Sufjan Stevens'],
    ['Funeral', 'Phoebe Bridgers'], ['Scott Street', 'Phoebe Bridgers'], ['Motion Sickness', 'Phoebe Bridgers'], ['Moon Song', 'Phoebe Bridgers'],
    ['Roslyn', 'Bon Iver & St. Vincent'], ['re: Stacks', 'Bon Iver'], ['Blood Bank', 'Bon Iver'], ['Anchor', 'Novo Amor'],
    ['Carry You', 'Novo Amor'], ['Repeat Until Death', 'Novo Amor'], ['No Surprises', 'Radiohead'], ['Fake Plastic Trees', 'Radiohead'], ['Videotape', 'Radiohead']
  ]);

  add('화남', 'KPOP', [
    ['UGH!', 'BTS'], ['Daechwita', 'Agust D'], ['Agust D', 'Agust D'], ['Arson', 'j-hope'], ['MORE', 'j-hope'],
    ['Dionysus', 'BTS'], ['S-Class', 'Stray Kids'], ['LALALALA', 'Stray Kids'], ['Chk Chk Boom', 'Stray Kids'], ['District 9', 'Stray Kids'],
    ['BOUNCY', 'ATEEZ'], ['Crazy Form', 'ATEEZ'], ['The Real', 'ATEEZ'], ['Kill This Love', 'BLACKPINK'], ['Pretty Savage', 'BLACKPINK'],
    ['I Am The Best', '2NE1'], ['CLAP', 'SEVENTEEN'], ['HIT', 'SEVENTEEN'], ['Simon Says', 'NCT 127'], ['Sticker', 'NCT 127']
  ]);

  add('화남', 'POP', [
    ['Break Stuff', 'Limp Bizkit'], ['Bodies', 'Drowning Pool'], ['Duality', 'Slipknot'], ['Before I Forget', 'Slipknot'], ['Killing in the Name', 'Rage Against the Machine'],
    ['Bulls on Parade', 'Rage Against the Machine'], ['Chop Suey!', 'System of a Down'], ['Toxicity', 'System of a Down'], ['Faint', 'Linkin Park'],
    ['Given Up', 'Linkin Park'], ['Papercut', 'Linkin Park'], ['Animal I Have Become', 'Three Days Grace'], ['I Hate Everything About You', 'Three Days Grace'],
    ['Monster', 'Skillet'], ['My Songs Know What You Did in the Dark', 'Fall Out Boy'], ['Uprising', 'Muse'], ['Killing Strangers', 'Marilyn Manson'],
    ['I Miss the Misery', 'Halestorm'], ['Ignorance', 'Paramore'], ['Monster', 'Paramore']
  ]);

  add('화남', 'INDIE', [
    ['505', 'Arctic Monkeys'], ['Brianstorm', 'Arctic Monkeys'], ['Teddy Picker', 'Arctic Monkeys'], ['Reptilia', 'The Strokes'],
    ['Juicebox', 'The Strokes'], ['Take Me Out', 'Franz Ferdinand'], ['This Fire', 'Franz Ferdinand'], ['Figure It Out', 'Royal Blood'],
    ['Out of the Black', 'Royal Blood'], ['Little Monster', 'Royal Blood'], ['Elephant', 'Tame Impala'], ['Pedestrian at Best', 'Courtney Barnett'],
    ['Seventeen', 'Sharon Van Etten'], ['The Rat', 'The Walkmen'], ['Obstacle 1', 'Interpol'], ['Evil', 'Interpol'],
    ['Salute Your Solution', 'The Raconteurs'], ['Icky Thump', 'The White Stripes'], ['Black Math', 'The White Stripes'], ['Maps', 'Yeah Yeah Yeahs']
  ]);

  add('피곤', 'KPOP', [
    ['Instagram', 'DEAN'], ['D (Half Moon)', 'DEAN'], ['dayfly', 'DEAN feat. Sulli & Rad Museum'], ['WA-R-R', 'Colde'],
    ['Your Dog Loves You', 'Colde feat. Crush'], ['Control Me', 'Colde'], ['Jasmine', 'DPR LIVE'], ['Martini Blue', 'DPR LIVE'],
    ['NAPPA', 'Crush'], ['Mayday', 'Crush feat. Joy'], ['Bittersweet', 'Wonwoo & Mingyu feat. LeeHi'], ['247', 'SEVENTEEN'],
    ['Through the Night', 'IU'], ['Palette', 'IU'], ['Love Poem', 'IU'], ['Rain', 'TAEYEON'], ['11:11', 'TAEYEON'],
    ['Galaxy', 'BOL4'], ['Restless', 'BIBI'], ['Peaches', 'KAI']
  ]);

  add('피곤', 'POP', [
    ['Slow Dancing in the Dark', 'Joji'], ['Glimpse of Us', 'Joji'], ['Sanctuary', 'Joji'], ['Like You Do', 'Joji'], ['Pink + White', 'Frank Ocean'],
    ['Ivy', 'Frank Ocean'], ['White Ferrari', 'Frank Ocean'], ['Moon River', 'Frank Ocean'], ['Location Unknown', 'HONNE'], ['Warm on a Cold Night', 'HONNE'],
    ['Day 1 ◑', 'HONNE'], ['La La Lost You', 'NIKI'], ['lowkey', 'NIKI'], ['Lose', 'NIKI'], ['Paris in the Rain', 'Lauv'],
    ['Mean It', 'Lauv & LANY'], ['Falling', 'Harry Styles'], ['Sweet Creature', 'Harry Styles'], ['Photograph', 'Ed Sheeran'], ['Best Part', 'Daniel Caesar feat. H.E.R.']
  ]);

  add('피곤', 'INDIE', [
    ['Show Me How', 'Men I Trust'], ['Numb', 'Men I Trust'], ['Lauren', 'Men I Trust'], ['Tailwhip', 'Men I Trust'], ['Tree Among Shrubs', 'Men I Trust'],
    ['Apocalypse', 'Cigarettes After Sex'], ['Nothing\'s Gonna Hurt You Baby', 'Cigarettes After Sex'], ['Sweet', 'Cigarettes After Sex'], ['K.', 'Cigarettes After Sex'],
    ['Space Song', 'Beach House'], ['Myth', 'Beach House'], ['PPP', 'Beach House'], ['Take Care', 'Beach House'], ['On the Sea', 'Beach House'],
    ['Sunkissed', 'khai dreams'], ['Fantasy', 'Alina Baraz & Galimatias'], ['Pretty Thoughts', 'Alina Baraz & Galimatias'], ['Anchor', 'Novo Amor'], ['Bloom', 'The Paper Kites'], ['Featherstone', 'The Paper Kites']
  ]);

  add('위로', 'KPOP', [
    ['To My Youth', 'BOL4'], ['Dear My Friend', 'Agust D feat. Kim Jong Wan'], ['People', 'Agust D'], ['Life Goes On', 'Agust D'],
    ['everythingoes', 'RM feat. Nell'], ['Wild Flower', 'RM feat. youjeen'], ['Blue & Grey', 'BTS'], ['Magic Shop', 'BTS'], ['Answer: Love Myself', 'BTS'],
    ['Spring Day', 'BTS'], ['Hug', 'SEVENTEEN'], ['Circles', 'SEVENTEEN'], ['Kidult', 'SEVENTEEN'], ['That\'s okay', 'D.O.'],
    ['End of a day', 'JONGHYUN'], ['Breathe', 'LEE HI'], ['HOLO', 'LEE HI'], ['Dear Me', 'TAEYEON'], ['My Sea', 'IU'], ['Dear Name', 'IU']
  ]);

  add('위로', 'POP', [
    ['Vienna', 'Billy Joel'], ['Rainbow', 'Kacey Musgraves'], ['Keep Your Head Up', 'Ben Howard'], ['Holocene', 'Bon Iver'], ['re: Stacks', 'Bon Iver'],
    ['Saturn', 'Sleeping At Last'], ['Turning Page', 'Sleeping At Last'], ['Bloom', 'The Paper Kites'], ['Anchor', 'Novo Amor'], ['Carry You', 'Novo Amor'],
    ['The Stable Song', 'Gregory Alan Isakov'], ['San Luis', 'Gregory Alan Isakov'], ['Keep Me', 'Novo Amor'], ['Heartbeats', 'José González'],
    ['To Be Alone With You', 'Sufjan Stevens'], ['Mystery of Love', 'Sufjan Stevens'], ['Cherry Wine', 'Hozier'], ['Like Real People Do', 'Hozier'],
    ['Work Song', 'Hozier'], ['First Day of My Life', 'Bright Eyes']
  ]);

  add('위로', 'INDIE', [
    ['Holocene', 'Bon Iver'], ['re: Stacks', 'Bon Iver'], ['Anchor', 'Novo Amor'], ['Carry You', 'Novo Amor'], ['Repeat Until Death', 'Novo Amor'],
    ['Bloom', 'The Paper Kites'], ['Featherstone', 'The Paper Kites'], ['On the Train Ride Home', 'The Paper Kites'], ['San Luis', 'Gregory Alan Isakov'],
    ['The Stable Song', 'Gregory Alan Isakov'], ['Mystery of Love', 'Sufjan Stevens'], ['To Be Alone With You', 'Sufjan Stevens'], ['Scott Street', 'Phoebe Bridgers'],
    ['Garden Song', 'Phoebe Bridgers'], ['No Surprises', 'Radiohead'], ['Nude', 'Radiohead'], ['Youth', 'Daughter'], ['Medicine', 'Daughter'],
    ['Nothing\'s Gonna Hurt You Baby', 'Cigarettes After Sex'], ['Show Me How', 'Men I Trust']
  ]);

  add('신남', 'KPOP', [
    ['Super', 'SEVENTEEN'], ['Very Nice', 'SEVENTEEN'], ['CLAP', 'SEVENTEEN'], ['HIT', 'SEVENTEEN'], ['Rock with you', 'SEVENTEEN'],
    ['Run BTS', 'BTS'], ['IDOL', 'BTS'], ['DOPE', 'BTS'], ['FIRE', 'BTS'], ['Boyz with Fun', 'BTS'],
    ['S-Class', 'Stray Kids'], ['LALALALA', 'Stray Kids'], ['Chk Chk Boom', 'Stray Kids'], ['BOUNCY', 'ATEEZ'], ['Crazy Form', 'ATEEZ'],
    ['DASH', 'NMIXX'], ['O.O', 'NMIXX'], ['Super Shy', 'NewJeans'], ['ETA', 'NewJeans'], ['How Sweet', 'NewJeans']
  ]);

  add('신남', 'POP', [
    ['Don\'t You Worry Child', 'Swedish House Mafia'], ['Levels', 'Avicii'], ['The Nights', 'Avicii'], ['Wake Me Up', 'Avicii'], ['Rather Be', 'Clean Bandit feat. Jess Glynne'],
    ['Titanium', 'David Guetta feat. Sia'], ['This Is What You Came For', 'Calvin Harris feat. Rihanna'], ['Feel So Close', 'Calvin Harris'], ['Summer', 'Calvin Harris'],
    ['One Kiss', 'Calvin Harris & Dua Lipa'], ['Break My Heart', 'Dua Lipa'], ['Physical', 'Dua Lipa'], ['Levitating', 'Dua Lipa'], ['Blinding Lights', 'The Weeknd'],
    ['Can\'t Hold Us', 'Macklemore & Ryan Lewis'], ['DJ Got Us Fallin\' in Love', 'Usher feat. Pitbull'], ['Raise Your Glass', 'P!nk'], ['Starships', 'Nicki Minaj'],
    ['Good Feeling', 'Flo Rida'], ['Party in the U.S.A.', 'Miley Cyrus']
  ]);

  add('신남', 'INDIE', [
    ['What You Know', 'Two Door Cinema Club'], ['Undercover Martyn', 'Two Door Cinema Club'], ['Something Good Can Work', 'Two Door Cinema Club'],
    ['A-Punk', 'Vampire Weekend'], ['Oxford Comma', 'Vampire Weekend'], ['Lisztomania', 'Phoenix'], ['1901', 'Phoenix'], ['Trying to Be Cool', 'Phoenix'],
    ['Last Nite', 'The Strokes'], ['Someday', 'The Strokes'], ['Electric Feel', 'MGMT'], ['Kids', 'MGMT'], ['Time to Pretend', 'MGMT'],
    ['Pumped Up Kicks', 'Foster the People'], ['Houdini', 'Foster the People'], ['Tongue Tied', 'Grouplove'], ['Anna Sun', 'WALK THE MOON'],
    ['Take a Walk', 'Passion Pit'], ['Sleepyhead', 'Passion Pit'], ['Walking on a Dream', 'Empire of the Sun']
  ]);

  add('SHARK', 'KPOP', [
    ['Moon', 'BTS'], ['Butterfly', 'BTS'], ['134340', 'BTS'], ['Love Maze', 'BTS'], ['Blue & Grey', 'BTS'],
    ['Fairy of Shampoo', 'TXT'], ['Ghosting', 'TXT'], ['20cm', 'TXT'], ['Opening Sequence', 'TXT'], ['Farewell, Neverland', 'TXT'],
    ['Dive Into You', 'NCT DREAM'], ['Teddy Bear', 'NCT DREAM'], ['Knock On', 'NCT 127'], ['Sun & Moon', 'NCT 127'], ['Jet Lag', 'NCT 127'],
    ['Automatic', 'Red Velvet'], ['Kingdom Come', 'Red Velvet'], ['Perfect 10', 'Red Velvet'], ['Underwater', 'Red Velvet'], ['Night Drive', 'Red Velvet'],
    ['Anywhere But Home', 'SEULGI'], ['In My Dreams', 'Red Velvet'], ['Impurities', 'LE SSERAFIM'], ['Sour Grapes', 'LE SSERAFIM'], ['Lucid Dream', 'aespa'],
    ['Thirsty', 'aespa'], ['Mine', 'aespa'], ['Blue Flame', 'LE SSERAFIM'], ['Cool With You', 'NewJeans'], ['Hurt', 'NewJeans']
  ]);

  add('SHARK', 'POP', [
    ['West Coast', 'Lana Del Rey'], ['Mariners Apartment Complex', 'Lana Del Rey'], ['Venice Bitch', 'Lana Del Rey'], ['Brooklyn Baby', 'Lana Del Rey'],
    ['Ride', 'Lana Del Rey'], ['Sweater Weather', 'The Neighbourhood'], ['Daddy Issues', 'The Neighbourhood'], ['Softcore', 'The Neighbourhood'],
    ['Reflections', 'The Neighbourhood'], ['After Dark', 'Mr.Kitty'], ['Midnight City', 'M83'], ['Wait', 'M83'], ['Outro', 'M83'],
    ['Nightcall', 'Kavinsky'], ['Instant Crush', 'Daft Punk feat. Julian Casablancas'], ['Something About Us', 'Daft Punk'], ['Lose Yourself to Dance', 'Daft Punk'],
    ['Borderline', 'Tame Impala'], ['Let It Happen', 'Tame Impala'], ['New Person, Same Old Mistakes', 'Tame Impala'], ['Eventually', 'Tame Impala'],
    ['Chamber of Reflection', 'Mac DeMarco'], ['My Kind of Woman', 'Mac DeMarco'], ['Moonlight on the River', 'Mac DeMarco'], ['For the First Time', 'Mac DeMarco'],
    ['Sunset Lover', 'Petit Biscuit'], ['Sweet Disposition', 'The Temper Trap'], ['Riptide', 'Vance Joy'], ['The Less I Know the Better', 'Tame Impala'], ['End of Beginning', 'Djo']
  ]);

  add('SHARK', 'INDIE', [
    ['nouvelle vague', 'wave to earth'], ['bonfire', 'wave to earth'], ['pink', 'wave to earth'], ['calla', 'wave to earth'], ['daisy.', 'wave to earth'],
    ['pueblo', 'wave to earth'], ['ride', 'wave to earth'], ['wave', 'wave to earth'], ['love.', 'wave to earth'], ['seasons', 'wave to earth'],
    ['bad', 'wave to earth'], ['peach eyes', 'wave to earth'], ['Surf.', 'wave to earth'], ['homesick', 'wave to earth'], ['light', 'wave to earth'],
    ['Ruthless', 'The Marías'], ['Hush', 'The Marías'], ['Heavy', 'The Marías'], ['Only in My Dreams', 'The Marías'], ['No One Noticed', 'The Marías'],
    ['Sienna', 'The Marías'], ['Over the Moon', 'The Marías'], ['Calling U Back', 'The Marías'], ['Cariño', 'The Marías'], ['I Don\'t Know You', 'The Marías'],
    ['Show Me How', 'Men I Trust'], ['Numb', 'Men I Trust'], ['Lauren', 'Men I Trust'], ['Tailwhip', 'Men I Trust'], ['Seven', 'Men I Trust'],
    ['Tree Among Shrubs', 'Men I Trust'], ['Sugar', 'Men I Trust'], ['Say Can You Hear', 'Men I Trust'], ['All Night', 'Men I Trust'], ['Norton Commander', 'Men I Trust'],
    ['Apocalypse', 'Cigarettes After Sex'], ['K.', 'Cigarettes After Sex'], ['Sweet', 'Cigarettes After Sex'], ['Heavenly', 'Cigarettes After Sex'], ['Sunsetz', 'Cigarettes After Sex'],
    ['John Wayne', 'Cigarettes After Sex'], ['Touch', 'Cigarettes After Sex'], ['Pistol', 'Cigarettes After Sex'], ['Cry', 'Cigarettes After Sex'], ['Opera House', 'Cigarettes After Sex'],
    ['Space Song', 'Beach House'], ['Myth', 'Beach House'], ['PPP', 'Beach House'], ['Silver Soul', 'Beach House'], ['Take Care', 'Beach House'],
    ['Lazuli', 'Beach House'], ['Zebra', 'Beach House'], ['On the Sea', 'Beach House'], ['Levitation', 'Beach House'], ['Wildflower', 'Beach House'],
    ['Intro', 'The xx'], ['Crystalised', 'The xx'], ['Angels', 'The xx'], ['Sunset', 'The xx'], ['Fiction', 'The xx'],
    ['Heart Skipped a Beat', 'The xx'], ['Islands', 'The xx'], ['VCR', 'The xx'], ['Infinity', 'The xx'], ['Chained', 'The xx'],
    ['505', 'Arctic Monkeys'], ['Do I Wanna Know?', 'Arctic Monkeys'], ['Why\'d You Only Call Me When You\'re High?', 'Arctic Monkeys'], ['No. 1 Party Anthem', 'Arctic Monkeys'],
    ['I Wanna Be Yours', 'Arctic Monkeys'], ['Only Ones Who Know', 'Arctic Monkeys'], ['Cornerstone', 'Arctic Monkeys'], ['Mad Sounds', 'Arctic Monkeys'],
    ['Sparks', 'Coldplay'], ['Trouble', 'Coldplay'], ['Amsterdam', 'Coldplay'], ['We Never Change', 'Coldplay'], ['Oceans', 'Coldplay'],
    ['The Scientist', 'Coldplay'], ['Midnight', 'Coldplay'], ['Magic', 'Coldplay'], ['Ink', 'Coldplay'], ['Another\'s Arms', 'Coldplay'],
    ['Dark Red', 'Steve Lacy'], ['Some', 'Steve Lacy'], ['C U Girl', 'Steve Lacy'], ['Ryd', 'Steve Lacy'], ['N Side', 'Steve Lacy'],
    ['Chamber of Reflection', 'Mac DeMarco'], ['My Kind of Woman', 'Mac DeMarco'], ['Moonlight on the River', 'Mac DeMarco'], ['For the First Time', 'Mac DeMarco'],
    ['Salad Days', 'Mac DeMarco'], ['Ode to Viceroy', 'Mac DeMarco'], ['Watching Him Fade Away', 'Mac DeMarco'], ['Passing Out Pieces', 'Mac DeMarco'],
    ['Slow Dancing in the Dark', 'Joji'], ['Sanctuary', 'Joji'], ['Yeah Right', 'Joji'], ['Like You Do', 'Joji'], ['Glimpse of Us', 'Joji'],
    ['Run', 'Joji'], ['Will He', 'Joji'], ['Demons', 'Joji'], ['Ew', 'Joji'], ['Die For You', 'Joji'],
    ['DIE 4 YOU', 'DEAN'], ['instagram', 'DEAN'], ['D (Half Moon)', 'DEAN'], ['What 2 Do', 'DEAN'], ['Bonnie & Clyde', 'DEAN'],
    ['21', 'DEAN'], ['I\'m Not Sorry', 'DEAN feat. Eric Bellinger'], ['dayfly', 'DEAN feat. Sulli & Rad Museum'], ['Howlin\' 404', 'DEAN'], ['Pour Up', 'DEAN feat. ZICO'],
    ['So Beautiful', 'DPR IAN'], ['No Blueberries', 'DPR IAN'], ['Nerves', 'DPR IAN'], ['Scaredy Cat', 'DPR IAN'], ['Mood', 'DPR IAN'],
    ['Ballroom Extravaganza', 'DPR IAN'], ['Don\'t Go Insane', 'DPR IAN'], ['Avalon', 'DPR IAN'], ['Merry Go', 'DPR IAN'], ['Dope Lovers', 'DPR IAN'],
    ['Square (2017)', 'Yerin Baek'], ['Maybe It\'s Not Our Fault', 'Yerin Baek'], ['Bye bye my blue', 'Yerin Baek'], ['0310', 'Yerin Baek'], ['Rest', 'Yerin Baek'],
    ['Popo (How deep is our love?)', 'Yerin Baek'], ['Across the universe', 'Yerin Baek'], ['Lovegame', 'Yerin Baek'], ['Hate you', 'Yerin Baek'], ['Pisces', 'Yerin Baek']
  ]);
})();
