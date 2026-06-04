-- ============================================================
--  005 — Recargar productos en INGLÉS
--  Ejecutar UNA sola vez en el SQL Editor de Supabase.
--  Borra los productos actuales (español, rutas viejas) y los
--  reinserta en inglés con las rutas .png correctas.
-- ============================================================

-- 1) Asegurar columnas necesarias (idempotente)
alter table public.products add column if not exists category text not null default 'leyendas';
alter table public.products add column if not exists updated_at timestamp with time zone default now();

-- 2) Vaciar productos (y order_items dependientes por la FK)
truncate table public.products cascade;

-- 3) Reinsertar el catálogo en inglés
-- Finals (22 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Dembélé · PSG 2025 · Club World Cup Final',
  'PSG''s shirt in the 2025 Club World Cup final. Dembélé as the spearhead of the Parisian attack.',
  149.99, 15, '/camisetas/camisetad-finales/dembele-psg-2025-mundialdeclubesfinal.png', 'finales'
),
(
  'Drogba · Chelsea 2012 · Champions League Final',
  'Drogba''s most epic night. The 88th-minute goal and the penalty shootout in Munich that made history.',
  179.99, 15, '/camisetas/camisetad-finales/drogba-chelsea-2012-finalchampions.png', 'finales'
),
(
  'Iniesta · Spain 2010 · World Cup Final',
  'The goal that gave Spain its first World Cup. Iniesta in the most important moment of Spanish football.',
  189.99, 15, '/camisetas/camisetad-finales/iniesta-españa-2010-finaldelmundo.png', 'finales'
),
(
  'Maldini · Milan 06/07 · Champions League Final',
  'Maldini''s last Champions League final. Pure leadership in Athens against Liverpool.',
  169.99, 15, '/camisetas/camisetad-finales/maldini-milan-06~07-finalchampions.png', 'finales'
),
(
  'Mbappé · France 2022 · World Cup Final',
  'The hat-trick in the final that wasn''t enough. Mbappé against Argentina in the best match of recent history.',
  169.99, 15, '/camisetas/camisetad-finales/mbappe-francia-22-finaldelmundo.png', 'finales'
),
(
  'Messi · Argentina 2024 · Copa América Final',
  'Messi''s last Copa América. Argentina champions at the Hard Rock Stadium, Miami.',
  169.99, 15, '/camisetas/camisetad-finales/messi-argenina-2024-fianlcopaamerica.png', 'finales'
),
(
  'Messi · Argentina 2021 · Copa América Final',
  'The cup that broke the drought. Messi champion with Argentina at the Maracanã.',
  169.99, 15, '/camisetas/camisetad-finales/messi-argentina-2021-finalddecopaacmerica.png', 'finales'
),
(
  'Messi · Argentina 2022 · World Cup Final',
  'The most sought-after shirt in history. Messi, world champion in Qatar. Unrepeatable.',
  199.99, 15, '/camisetas/camisetad-finales/messi-argentina-2022-home-finaldelmundo.png', 'finales'
),
(
  'Messi · Barcelona 08/09 · Champions League Final',
  'Messi''s first Champions League. Guardiola''s Barça in Rome, 2-0 over United.',
  179.99, 15, '/camisetas/camisetad-finales/messi-barcelona-08~09-finalchampions.png', 'finales'
),
(
  'Messi · Barcelona 10/11 · Champions League Final',
  'Wembley. The greatest Barça in history against United. Messi at his peak.',
  179.99, 15, '/camisetas/camisetad-finales/messi-barcelona-10~11-home-finaldechampions.png', 'finales'
),
(
  'Neymar · PSG 18/19 · Champions League Final',
  'PSG at its most ambitious. Neymar leading the most exciting European campaign of the Parisian side.',
  149.99, 15, '/camisetas/camisetad-finales/neymar-psg-18-19-finalchampions.png', 'finales'
),
(
  'Palermo · Boca 2000 · Club World Cup Final',
  'Bianchi''s Boca in Tokyo. Palermo as a legend of a team that ruled the world.',
  169.99, 15, '/camisetas/camisetad-finales/palermo-boca-2000-mundialdeclubesfinal.png', 'finales'
),
(
  'Piti · River 2018 · Copa Libertadores Final',
  'The craziest final in South American football history. River champions at the Bernabéu.',
  159.99, 15, '/camisetas/camisetad-finales/piti-river-2018-finaldelibertadores.png', 'finales'
),
(
  'Reus · Dortmund 14/15',
  'Klopp''s Borussia in its most romantic era. Reus as captain and symbol of the club.',
  139.99, 15, '/camisetas/camisetad-finales/reus-dormunt-14~15-home.png', 'finales'
),
(
  'Riquelme · Boca 2007 · Copa Libertadores Final',
  'The last great Riquelme at Boca. The absolute playmaker of a memorable final.',
  169.99, 15, '/camisetas/camisetad-finales/riquelme-boca-2007-finaldelibertadores.png', 'finales'
),
(
  'Robben · Netherlands 2010 · World Cup Final',
  'Van Marwijk''s Holland that reached the final. Robben and the one-on-one that never was.',
  169.99, 15, '/camisetas/camisetad-finales/robben-paisesbajos-2010-finaldelmuendo.png', 'finales'
),
(
  'Roberto Carlos · Brazil 2001 · World Cup Final',
  'Scolari''s Brazil on the eve of the tetra-championship. Roberto Carlos at his very best.',
  159.99, 15, '/camisetas/camisetad-finales/robertocarlos-brazil-01~01-finalmundial.png', 'finales'
),
(
  'Román · Boca 2003 · Club World Cup Final',
  'Boca, world champions in Tokyo. Riquelme and Tevez in an unrepeatable team.',
  169.99, 15, '/camisetas/camisetad-finales/roman-boca-2003-mundialdeclubesfinal.png', 'finales'
),
(
  'Ronaldo · Madrid 17/18 · Champions League Final',
  'CR7''s last Champions with Madrid. Kyiv, the most dominant Champions run in history.',
  179.99, 15, '/camisetas/camisetad-finales/ronaldo-madrid-17~18-finaldechampions.png', 'finales'
),
(
  'Ronaldo · Portugal 07/08 · Champions League Final',
  'Ferguson''s best United. Ronaldo MVP in the Moscow final against Chelsea.',
  159.99, 15, '/camisetas/camisetad-finales/ronaldo-portugal-07~08-finalchampions.png', 'finales'
),
(
  'Ronaldo · Portugal 15/16 · Euro Final',
  'Portugal, European champions, crying from the bench. Eder''s night in Saint-Denis.',
  169.99, 15, '/camisetas/camisetad-finales/ronaldo-portugal-15~16-finaleuro.png', 'finales'
),
(
  'Ronaldo · Portugal 2025 · Euro Final',
  'CR7 in another continental final with Portugal. The veteran who is still a protagonist.',
  149.99, 15, '/camisetas/camisetad-finales/ronaldo-portugal-2025-finaleuro.png', 'finales'
);

-- Iconic Drops (12 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Argentina 2024 · Anniversary',
  'Special edition for the AFA anniversary. A blend of history and modernity in a single shirt.',
  119.99, 15, '/camisetas/drops-iconicos/argentina-2024-aniversario.png', 'drops-iconicos'
),
(
  'Arsenal 91/93 · Bruised Banana',
  'One of the most iconic shirts in English football history. The yellow and blue no one forgot.',
  129.99, 15, '/camisetas/drops-iconicos/arsenall-91~93-bruised banana.png', 'drops-iconicos'
),
(
  'Bayern 14/15 · Third',
  'Bayern''s third kit in its most dominant era. A dark, elegant design.',
  109.99, 15, '/camisetas/drops-iconicos/bayern-14~15-third.png', 'drops-iconicos'
),
(
  'Borussia 22/24 · Special Edition',
  'A Dortmund special edition. The eternal yellow with a different twist.',
  99.99, 15, '/camisetas/drops-iconicos/borussia-22~24-special.png', 'drops-iconicos'
),
(
  'Borussia 23/24 · Anniversary',
  'A commemorative Borussia Dortmund shirt. A tribute to decades of yellow-and-black history.',
  99.99, 15, '/camisetas/drops-iconicos/borussia-23~24-anniversary.png', 'drops-iconicos'
),
(
  'Inter 99/00 · Third',
  'Inter''s third kit at the turn of the millennium. A design ahead of its time.',
  109.99, 15, '/camisetas/drops-iconicos/inter-99~00-third.png', 'drops-iconicos'
),
(
  'Milan 99/00 · Century',
  'The Milan of the century. A centenary special edition with one of the most memorable designs.',
  119.99, 15, '/camisetas/drops-iconicos/milan-99~00-century.png', 'drops-iconicos'
),
(
  'PSG 18/19 · Graphic Design',
  'PSG''s alternative home version. A graphic design that broke convention.',
  109.99, 15, '/camisetas/drops-iconicos/psg-18~19-hommeV2-graficdesing.png', 'drops-iconicos'
),
(
  'PSG 2019 · x Jordan',
  'The collaboration that changed the jersey market. PSG and Jordan Brand in a cult piece.',
  129.99, 15, '/camisetas/drops-iconicos/psg-2019-psgxjordan.png', 'drops-iconicos'
),
(
  'Real Madrid 14/15 · Away',
  'The away kit of Madrid''s Décima era. Light blue and Madridista elegance.',
  109.99, 15, '/camisetas/drops-iconicos/realmadrid-14~15-away.png', 'drops-iconicos'
),
(
  'Real Madrid 14/15 · Third',
  'The third kit of the Champions-winning Madrid. One of the most celebrated alternative kits.',
  109.99, 15, '/camisetas/drops-iconicos/realmadrid-14~15-third.png', 'drops-iconicos'
),
(
  'Real Madrid 16/17 · Away',
  'The away kit of the Madrid that won the Champions unbeaten in the group stage.',
  109.99, 15, '/camisetas/drops-iconicos/realmadrid-16~17-away.png', 'drops-iconicos'
);

-- Legends: Beckenbauer (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Beckenbauer · Germany 1976',
  'The Kaiser at the peak of his international career. Germany, champions of Europe and the world.',
  149.99, 15, '/camisetas/leyendas/beckenbauer/becken-alemania-76-home.png', 'leyendas'
),
(
  'Beckenbauer · Bayern 1973',
  'The Bayern of the first European titles. Beckenbauer as the leader who redefined total football.',
  139.99, 15, '/camisetas/leyendas/beckenbauer/becken-bayern-73-home.png', 'leyendas'
),
(
  'Beckenbauer · Bayern 1976',
  'The Kaiser at Bayern in its finest era. Three consecutive European Cups.',
  139.99, 15, '/camisetas/leyendas/beckenbauer/becken-bayern-76-home.png', 'leyendas'
);

-- Legends: Maldini (2 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Maldini · Italy 2002',
  'Italy''s captain at the Korea-Japan World Cup. Maldini as a symbol of Italian defending.',
  139.99, 15, '/camisetas/leyendas/maldini/maldini-italia-02-home.png', 'leyendas'
),
(
  'Maldini · Milan 08/09',
  'Maldini''s final season. A farewell worthy of the most elegant player in history.',
  149.99, 15, '/camisetas/leyendas/maldini/maldini-milan-08~09-home.png', 'leyendas'
);

-- Legends: Maradona (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Maradona · Argentina 1986',
  'The most sacred shirt in football. Diego at Mexico 86, the greatest World Cup ever played by one man.',
  169.99, 15, '/camisetas/leyendas/maradona/maradona-argentina-86-home.png', 'leyendas'
),
(
  'Maradona · Boca 96/97',
  'Diego''s return to his love. Maradona at Boca, his last dance in Argentine football.',
  149.99, 15, '/camisetas/leyendas/maradona/maradona-boca-96~97-home.png', 'leyendas'
),
(
  'Maradona · Napoli 84/85',
  'The start of the legend in Italy. Diego arriving in Naples and changing the history of a city.',
  159.99, 15, '/camisetas/leyendas/maradona/maradona-napoli-84~85-home.png', 'leyendas'
);

-- Legends: Mbappé (4 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Mbappé · France 2022',
  'The Mbappé of the hat-trick in the Qatar final. The most impressive individual performance in a World Cup final.',
  149.99, 15, '/camisetas/leyendas/mbappe/mbapee-francia-22-home.png', 'leyendas'
),
(
  'Mbappé · Real Madrid 2025',
  'The dream come true. Mbappé in white at the Santiago Bernabéu.',
  159.99, 15, '/camisetas/leyendas/mbappe/mbappe-madrid-25-home.png', 'leyendas'
),
(
  'Mbappé · PSG 18/19',
  'The Parisian Mbappé in his best season with PSG. Speed and goals in Ligue 1.',
  139.99, 15, '/camisetas/leyendas/mbappe/mbappe-psg-18~19-home.png', 'leyendas'
),
(
  'Mbappé · Monaco 16/17',
  'The revelation to the world. A teenage Mbappé tearing defenses apart in the Champions League with Monaco.',
  129.99, 15, '/camisetas/leyendas/mbappe/monaco-monaco-16~17-home.png', 'leyendas'
);

-- Legends: Messi (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Messi · Argentina 2022',
  'The world champion''s shirt. Messi completing his legacy in Qatar.',
  179.99, 15, '/camisetas/leyendas/messi/messi-argentina-2022-home.png', 'leyendas'
),
(
  'Messi · Barcelona 15/16',
  'The MSN at its most lethal. Messi, Suárez and Neymar making history at the Camp Nou.',
  159.99, 15, '/camisetas/leyendas/messi/messi-barcelona-15~16-home.png', 'leyendas'
),
(
  'Messi · Barcelona 16/17 · Copa del Rey',
  'The comeback against PSG and the Copa del Rey. Messi leading Barça in an epic season.',
  149.99, 15, '/camisetas/leyendas/messi/messi-barcelona-16~17-home-finalcopadelrey.png', 'leyendas'
);

-- Legends: Neymar (4 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Neymar · Barcelona 14/15',
  'The treble season with Messi and Suárez. Neymar in the best team in the world.',
  149.99, 15, '/camisetas/leyendas/neymar/neymar-barcelona-14-15-away.png', 'leyendas'
),
(
  'Neymar · Brazil 2021',
  'Neymar carrying Brazil''s flag at the Copa América. The captain at home.',
  129.99, 15, '/camisetas/leyendas/neymar/neymar-brazil-2021-home.png', 'leyendas'
),
(
  'Neymar · PSG 18/19',
  'Neymar''s most anticipated season in Paris. Before the injuries, the most expensive player in the world.',
  139.99, 15, '/camisetas/leyendas/neymar/neymar-psg-18-19-home.png', 'leyendas'
),
(
  'Neymar · Santos 2009 · First Shirt',
  'Where it all began. Neymar debuting at Santos, barely a teenager who was already different.',
  119.99, 15, '/camisetas/leyendas/neymar/neymar-santos-09~08-home-primeracami.png', 'leyendas'
);

-- Legends: Pelé (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Pelé · Brazil 1958',
  'Pelé''s World Cup debut at 17. The shirt of the youngest player to win a World Cup.',
  169.99, 15, '/camisetas/leyendas/pele/brazil-1958-58-home.png', 'leyendas'
),
(
  'Pelé · Cosmos 1977',
  'O Rei''s last dance in New York. Pelé bringing football to the United States.',
  139.99, 15, '/camisetas/leyendas/pele/pele-cosmos-77-home.png', 'leyendas'
),
(
  'Pelé · Santos 1971',
  'Pelé at Santos, his home. The king of football at the club where he built his legend.',
  149.99, 15, '/camisetas/leyendas/pele/pele-santos-71-home.png', 'leyendas'
);

-- Legends: Ronaldinho (4 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Ronaldinho · Barcelona 06/07',
  'Ronaldinho''s last great year at Barça. Pure magic at the Camp Nou.',
  159.99, 15, '/camisetas/leyendas/ronaldinho/ronaldihno-barcelona-06~07-home.png', 'leyendas'
),
(
  'Ronaldinho · Brazil 07/08',
  'Football''s most famous smile wearing the canarinha. Ronaldinho, eternal with Brazil.',
  149.99, 15, '/camisetas/leyendas/ronaldinho/ronaldihno-brazil-07~08-home.png', 'leyendas'
),
(
  'Ronaldinho · Flamengo 11/12',
  'The return to Brazil with Mengão. Ronaldinho delighting the Maracanã with his unique football.',
  119.99, 15, '/camisetas/leyendas/ronaldinho/ronaldihno-flamengo-11~12-home.png', 'leyendas'
),
(
  'Ronaldinho · Grêmio 00/01',
  'R10''s beginnings in Porto Alegre. The shirt where it all started for the world''s best.',
  129.99, 15, '/camisetas/leyendas/ronaldinho/ronaldihno-gremio-00~01-home.png', 'leyendas'
);

-- Legends: Ronaldo Nazário (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Ronaldo Nazário · Barcelona 96/97',
  'O Fenômeno arriving in Europe. Ronaldo destroying La Liga with 47 goals in a season.',
  159.99, 15, '/camisetas/leyendas/ronaldo-nazario/ronaldonazario-barcelona-96~97-home.png', 'leyendas'
),
(
  'Ronaldo Nazário · Inter 01/02',
  'The return of O Fenômeno after the injuries. Ronaldo at Inter before his last World Cup.',
  149.99, 15, '/camisetas/leyendas/ronaldo-nazario/ronaldonazario-inter-01~02-home.png', 'leyendas'
),
(
  'Ronaldo Nazário · Real Madrid 06/07',
  'The last Ronaldo at Madrid. O Fenômeno closing his career at the Bernabéu.',
  149.99, 15, '/camisetas/leyendas/ronaldo-nazario/ronaldonazario-realmadrid-06~07-home.png', 'leyendas'
);

-- Legends: Ronaldo CR7 (4 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Ronaldo · Real Madrid 16/17',
  'The year of la Undécima. CR7 at his most dominant at Madrid.',
  149.99, 15, '/camisetas/leyendas/ronaldo/ronaldo-madrid-16~17-home.png', 'leyendas'
),
(
  'Ronaldo · Real Madrid 17/18 · Final Year',
  'CR7''s farewell season at Madrid. La Duodécima and goodbye to the Bernabéu.',
  159.99, 15, '/camisetas/leyendas/ronaldo/ronaldo-madrid-17~18-home_ultimoaniodelbicho.png', 'leyendas'
),
(
  'Ronaldo · Real Madrid 2022',
  'CR7 visiting the Bernabéu. A shirt that marked his return to the Madrid spotlight.',
  129.99, 15, '/camisetas/leyendas/ronaldo/ronaldo-madrid-22_home.png', 'leyendas'
),
(
  'Ronaldo · Manchester United 07/08',
  'The best Ronaldo at Old Trafford. The Premier League and the Champions League in a single season.',
  149.99, 15, '/camisetas/leyendas/ronaldo/ronaldo-united-07~08-home.png', 'leyendas'
);

-- Legends: Zidane (3 products)
insert into public.products (name, description, price, stock, image_url, category) values
(
  'Zidane · France 1998',
  'World champion at home. Zidane with two headers in the final against Brazil.',
  159.99, 15, '/camisetas/leyendas/zidane/zidane-francia-98-home.png', 'leyendas'
),
(
  'Zidane · Juventus 00/01',
  'The last Zidane in Turin before his galáctico transfer. Serie A with the Vecchia Signora.',
  139.99, 15, '/camisetas/leyendas/zidane/zidane-juventus-00~01-home.png', 'leyendas'
),
(
  'Zidane · Real Madrid 04/05',
  'Zizou at the Bernabéu. French elegance in white in his best Madrid era.',
  149.99, 15, '/camisetas/leyendas/zidane/zidane-madrid-04~05-home.png', 'leyendas'
);
