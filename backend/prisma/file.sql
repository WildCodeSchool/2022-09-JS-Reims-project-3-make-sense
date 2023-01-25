INSERT INTO user (firstname, lastname, image_url, role, email, hashed_password) VALUES 
('John','Doe','https://i.pravatar.cc/150?img=3','visitor','visitor@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI'),
('Jane','Doe','https://i.pravatar.cc/150?img=20','employee','employee@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI'),
('Jack','Doe','https://i.pravatar.cc/150?img=6','admin','admin@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI');


INSERT INTO decision (title, deadline, publish_date, start_content, impact, risk, advantage, user_id) 
VALUES (
  'Mise en place d\'un système de télétravail pour les employés'
,'2023-03-15'
,'2023-01-15'
,'L\'entreprise fictive souhaite mettre en place un système de télétravail pour ses employés, afin de leur permettre de travailler à distance de manière régulière. Cela inclura la mise à disposition des outils et technologies nécessaires, ainsi que la formation des employés pour utiliser efficacement ces outils.'
,'Cette décision aurait un impact positif sur la flexibilité et la productivité des employés, ainsi qu\'une réduction des coûts de transport pour l\'entreprise. Il pourrait également améliorer la qualité de vie des employés en leur permettant de passer plus de temps à la maison.'
,'Il y aurait un risque de perte de communication et de collaboration entre les employés, ainsi qu\'un risque de diminution de la culture d\'entreprise. Il pourrait également y avoir des risques de sécurité liés à l\'utilisation de technologies à distance. Il serait important de mettre en place des mécanismes pour gérer ces risques.'
,'Les employés pourraient travailler à des heures qui leur conviennent le mieux, ce qui pourrait améliorer leur satisfaction au travail et leur bien-être général. Il pourrait également réduire les absences et améliorer la rétention des employés. La réduction des coûts de transport pourrait également être un avantage financier pour l\'entreprise.'
, 2)
, ('Lancement d\'un nouveau produit'
,'2022-12-08'
,'2022-12-30'
,'L\'entreprise fictive souhaite lancer un nouveau produit sur le marché, qui sera destiné à une clientèle cible spécifique. Cette décision implique la recherche et développement d\'un produit, la création de campagnes de marketing pour promouvoir le produit, et l\'installation de systèmes pour gérer la production et la distribution.'
,'Cette décision aurait un impact positif sur les revenus de l\'entreprise, en augmentant les ventes et en augmentant la part de marché. Il pourrait également améliorer la réputation de l\'entreprise en proposant un produit innovant et pertinent pour sa cible.'
,'Il y aurait un risque financier, lié aux coûts de recherche et développement, de production et de marketing. Il y aurait également un risque que le produit ne soit pas accepté par la clientèle cible, ce qui aurait des conséquences sur les ventes et les revenus de l\'entreprise. Il serait important de mettre en place des mécanismes pour évaluer les risques liés à ce projet et pour gérer les risques.'
,'Le lancement d\'un nouveau produit pourrait générer de nouvelles opportunités de vente et de croissance pour l\'entreprise. Il pourrait également améliorer la réputation de l\'entreprise en proposant un produit qui répond aux besoins des consommateurs.'
, 2)
, ('Acquisition d\'une entreprise concurrente'
,'2023-03-15'
,'2023-01-15'
,'L\'entreprise fictive souhaite étendre son marché en acquérant une entreprise concurrente qui a des activités complémentaires. Cette décision implique des négociations et des études financières pour finaliser l\'acquisition, ainsi qu\'une planification pour intégrer les employés et les activités de l\'entreprise acquise dans l\'entreprise fictive.'
,'Cette décision aurait un impact positif sur la croissance de l\'entreprise en étendant son marché et en augmentant ses parts de marché. Il pourrait également améliorer l\'efficacité en réduisant les coûts et en augmentant les synergie entre les deux entreprises.'
,'Il y aurait un risque financier lié aux coûts de l\'acquisition et aux risques liés à l\'intégration des deux entreprises. Il y aurait également un risque de perte de clients ou de talents importants de l\'entreprise acquise. Il serait important de mettre en place des mécanismes pour évaluer les risques liés à cette acquisition et pour gérer ces risques.'
,'L\'acquisition d\'une entreprise concurrente pourrait offrir de nouvelles opportunités de croissance et de diversification pour l\'entreprise fictive. Il pourrait également améliorer l\'efficacité en réduisant les coûts et en augmentant les synergie entre les deux entreprises.'
, 3)
, ('Implantation d\'une stratégie de développement durable'
,'2022-12-08'
,'2022-12-30'
,'L\'entreprise fictive souhaite mettre en place une stratégie de développement durable pour réduire son impact environnemental et social, et améliorer sa responsabilité envers les parties prenantes. Cette décision implique l\'élaboration d\'objectifs et de plans d\'actions, la mise en place de processus de suivi et de reporting, et la sensibilisation et la formation des employés pour atteindre ces objectifs.'
,'Cette décision aurait un impact positif sur l\'image de marque de l\'entreprise en montrant son engagement en faveur du développement durable, et pourrait améliorer la relations avec les parties prenantes. Il pourrait également réduire les coûts opérationnels et les risques réglementaires en réduisant les consommations d\'énergie et les déchets.'
,'Il y aurait un risque financier lié aux coûts de mise en place et de maintien de la stratégie de développement durable. Il y aurait également un risque de non-respect des objectifs fixés, et donc de non-atteinte des bénéfices escomptés. Il serait important de mettre en place des mécanismes pour évaluer les risques liés à cette stratégie et pour gérer ces risques.'
,'La mise en place d\'une stratégie de développement durable pourrait améliorer l\'image de marque de l\'entreprise et renforcer sa réputation auprès des consommateurs et des investisseurs. Il pourrait également améliorer la qualité de vie des employés et des communautés environnantes, et réduire les coûts opérationnels à long terme.'
, 3);

insert into concerned (user_status, decision_id, user_id) values
("impacted", 1, 2),
("experts", 1, 3),
("impacted", 2, 3),
("experts", 3, 1),
("experts", 3, 2),
("experts", 1, 1),
("experts", 1, 2),
("impacted", 2, 2),
("impacted", 2, 3),
("experts", 3, 3),
("impacted", 3, 2),
("impacted", 3, 3),
("impacted", 4, 2),
("impacted", 4, 3),
("impacted", 4, 1);

insert into comment (content, user_id, decision_id) values
("premier commentaire test", 1, 1),
("deuxième commentaire test", 1, 2),
("troisième commentaire test", 2, 1),
("quatrième commentaire test", 3, 1),
("cinquième commentaire test", 3, 2),
("sixième commentaire test", 2, 2);

