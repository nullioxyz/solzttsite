-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: db-mysql-ams3-95825-do-user-8358018-0.i.db.ondigitalocean.com    Database: solzttdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '4060bf2f-a054-11ef-9c07-16ecd8ff4d3d:1-212,
5deadf76-0e3f-11f0-bfd7-a2bed16d196e:1-42,
eb14589f-18ee-11f0-a646-e21fd778530e:1-106';

--
-- Table structure for table `available_design`
--

DROP TABLE IF EXISTS `available_design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available_design` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint DEFAULT '0',
  `available` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `content_type_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `available_design_category_id_foreign` (`category_id`),
  KEY `available_design_content_type_id_foreign` (`content_type_id`),
  CONSTRAINT `available_design_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `available_design_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_design`
--

LOCK TABLES `available_design` WRITE;
/*!40000 ALTER TABLE `available_design` DISABLE KEYS */;
INSERT INTO `available_design` VALUES (1,'flower1',1,1,'2024-11-15 19:19:32','2025-04-19 16:15:46',NULL,1,NULL),(2,'flower2',1,1,'2024-11-15 19:19:32','2025-04-15 19:06:11',NULL,2,NULL),(3,'flower3',1,1,'2024-11-15 19:19:32','2025-04-15 19:15:11',NULL,3,NULL),(4,'flower4',1,1,'2024-11-15 19:19:32','2025-04-15 19:19:56',NULL,1,NULL),(5,'flower5',1,1,'2024-11-15 19:19:32','2025-04-15 19:25:16',NULL,2,NULL),(6,'flower 6',1,1,'2025-04-15 19:24:21','2025-04-15 19:26:12',NULL,1,1),(7,'ramoeflores',1,1,'2025-04-16 13:08:12','2025-04-16 13:08:12',NULL,3,1),(8,'borboletaeramo',1,1,'2025-04-16 13:15:49','2025-04-16 13:15:49',NULL,3,1),(9,'floreborboletanamao',1,1,'2025-04-16 13:23:23','2025-04-16 13:23:23',NULL,3,1),(10,'arvore',1,1,'2025-04-16 13:26:43','2025-04-16 13:26:43',NULL,3,1),(11,'montanhanascostas',1,1,'2025-04-16 13:34:29','2025-04-16 13:34:29',NULL,2,1),(12,'fissurasdeluz',1,1,'2025-04-16 13:41:49','2025-04-16 13:41:49',NULL,2,1),(13,'fluir',1,1,'2025-04-16 13:50:25','2025-04-16 13:55:36',NULL,2,1),(14,'neotribal',1,1,'2025-04-16 13:53:27','2025-04-16 13:56:28',NULL,2,1),(15,'maosornamentais',1,1,'2025-04-16 14:00:39','2025-04-16 14:00:39',NULL,2,1),(16,'floresabstratas',1,1,'2025-04-16 14:06:32','2025-04-16 14:06:32',NULL,2,1),(17,'abstractflower',1,1,'2025-04-16 14:11:51','2025-04-16 14:11:51',NULL,2,1),(18,'redpanda',1,1,'2025-04-16 17:00:17','2025-04-16 17:04:51',NULL,5,1),(19,'panda',1,1,'2025-04-16 17:03:50','2025-04-16 17:06:10',NULL,5,1),(20,'inverno',1,1,'2025-04-17 06:48:54','2025-04-17 06:48:54',NULL,5,1),(21,'serenditpi',1,1,'2025-04-17 14:51:17','2025-04-17 14:51:17',NULL,2,1),(22,'braceletes',1,1,'2025-04-17 14:59:06','2025-04-17 14:59:06',NULL,2,1);
/*!40000 ALTER TABLE `available_design` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `available_design_lang`
--

DROP TABLE IF EXISTS `available_design_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available_design_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `language_id` bigint unsigned NOT NULL,
  `available_design_id` bigint unsigned NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `available_design_lang_language_id_foreign` (`language_id`),
  KEY `available_design_lang_available_design_id_foreign` (`available_design_id`),
  CONSTRAINT `available_design_lang_available_design_id_foreign` FOREIGN KEY (`available_design_id`) REFERENCES `available_design` (`id`),
  CONSTRAINT `available_design_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_design_lang`
--

LOCK TABLES `available_design_lang` WRITE;
/*!40000 ALTER TABLE `available_design_lang` DISABLE KEYS */;
INSERT INTO `available_design_lang` VALUES (1,1,1,'Flor 1','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas a mão, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','flor1pt'),(2,1,2,'Flor 2','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas a mão, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','desenho-disponivel-2'),(3,1,3,'Serpente','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas sobre folhas naturais, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','desenho-disponivel-3'),(4,1,4,'Flor 3','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas sobre folhas naturais, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','desenho-disponivel-4'),(5,1,5,'Flor 4','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas sobre folhas naturais, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','desenho-disponivel-5'),(6,2,1,'Fiore 1','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','disegno-disponibile-1-it'),(7,2,2,'Fiore 2','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','disegno-disponibile-2-it'),(8,2,3,'Serpente','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','disegno-disponibile-3-it'),(9,2,4,'Fiore 3','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','disegno-disponibile-4-it'),(10,2,5,'Fiore 4','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','disegno-disponibile-5-it'),(11,3,1,'Flower 1','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','available-design-1-english'),(12,3,2,'Flower 2','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','available-design-2-english'),(13,3,3,'Serpent','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','available-design-3-english'),(14,3,4,'Flower 3','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','available-design-4-english'),(15,3,5,'Flower 4','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','available-design-5-english'),(16,1,6,'flor 5','<p><strong>Colagens Galácticas</strong> é uma série que nasceu do meu processo de pesquisa para tatuagens pensadas no corpo em movimento. Todos os desenhos foram criados com recortes reais de papéis e pinturas feitas sobre folhas naturais, depois fotografados e aplicados digitalmente em modelos 3D. Nesta fase, exploro traços mais grossos e limpos, criando contrastes marcantes com a pele. As composições combinam flores abstratas e uma única cobra que serpenteia entre os gestos do desenho.</p>','flor5pt'),(17,2,6,'Fiore 5','<p><strong>Collage Galattiche</strong> è una serie nata dal mio percorso di ricerca su disegni pensati per il corpo in movimento. Tutte le composizioni sono state realizzate con ritagli di carta veri e texture dipinte a mano, poi fotografate e applicate digitalmente su modelli 3D. In questa fase esploro linee più spesse e pulite, creando contrasti marcati con la pelle. Le composizioni uniscono forme floreali astratte e un unico serpente che si muove tra i gesti del disegno.</p>','fiore5it'),(18,3,6,'Flower 5','<p><strong>Galactic Collages</strong> is a series born from my ongoing research into tattoo designs created for the body in motion. All compositions were made using real paper cutouts and hand-painted textures, later photographed and digitally applied to 3D models. In this phase, I explore bolder and cleaner lines, creating striking contrasts against the skin. The visuals combine abstract floral forms and a single snake that weaves through the gestures of each design.</p>','flower5en'),(19,1,7,'Rosto e Ramo','<p>Projeto de tatuagem delicado e melancólico, pensado para áreas alongadas como braços, pernas ou o tronco. As cores e o tamanho podem ser adaptados de acordo com o corpo e a proposta. É possível substituir o rosto por alguém significativo ou trocar as flores por outras espécies que tenham sentido para você.</p>','rostoeramo-pt'),(20,2,7,'Faccia e Ramo','<p>Un progetto di tatuaggio delicato e malinconico, ideale per zone allungate come braccia, gambe o il tronco. Colori e dimensioni sono adattabili al corpo e alle esigenze personali. Il volto può essere sostituito con una persona significativa e i fiori possono essere cambiati con altre specie che abbiano un valore simbolico per te.</p>','facciaeramo-it'),(21,3,7,'Face and Branch','<p>A delicate and melancholic tattoo design, ideal for elongated areas such as arms, legs, or the torso. Both the colors and size can be adapted to fit the body and personal preferences. The face can be replaced with someone meaningful to you, and the flowers can also be changed for other species that hold significance.</p>','faceandbranch-en'),(22,1,8,'Ramo e Borboleta','<p>Projeto de tatuagem delicado e melancólico, pensado para áreas alongadas como braços, pernas ou o tronco. As cores e o tamanho podem ser adaptados de acordo com o corpo e a proposta. É possível substituir o elemento ou trocar as flores por outras espécies que tenham mais sentido para você.</p>','ramoeborboleta'),(23,2,8,'Ramo e farfalla','<p>Disegno di tatuaggio delicato e malinconico, pensato per zone allungate come braccia, gambe o busto. Colori e taglie possono essere adattati in base al corpo e alla proposta. Puoi sostituire l\'elemento o scambiare i fiori con altre specie che ti sembrano più adatte.</p>','ramoefarfalla-it'),(24,3,8,'Branch and Butterfly','<p>Delicate and melancholic tattoo design, designed for areas along the body such as arms, arms or trunk. The cores and the same ones can be adapted to suit the body and the proposal. It is possible to replace the element or find flowers for other species that we have always heard of.</p>','branchandbutterfly-en'),(25,1,9,'Flor e Borboleta na mão','<p>Projeto de tatuagem delicado e melancólico, pensado para áreas alongadas como braços, pernas ou o tronco. As cores e o tamanho podem ser adaptados de acordo com o corpo e a proposta. É possível substituir o rosto por alguém significativo ou trocar as flores por outras espécies que tenham sentido para você.</p>','floreborboletanamao-pt'),(26,2,9,'Fiore e Farfalla in mano','<p>Un progetto di tatuaggio delicato e malinconico, ideale per zone allungate come braccia, gambe o il tronco. Colori e dimensioni sono adattabili al corpo e alle esigenze personali. Il volto può essere sostituito con una persona significativa e i fiori possono essere cambiati con altre specie che abbiano un valore simbolico per te.</p>','fioreefarfallainmano-it'),(27,3,9,'Flower and Butterfly in hand','<p>A delicate and melancholic tattoo design, ideal for elongated areas such as arms, legs, or the torso. Both the colors and size can be adapted to fit the body and personal preferences. The face can be replaced with someone meaningful to you, and the flowers can also be changed for other species that hold significance.</p>','flowerandbutterflyinhand-en'),(28,1,10,'Arvore','<p>Projeto de tatuagem delicado e melancólico, pensado para áreas alongadas como braços, pernas ou o tronco. As cores e o tamanho podem ser adaptados de acordo com o corpo e a proposta.&nbsp;</p>','arvore-pt'),(29,2,10,'Albero','<p>Un progetto di tatuaggio delicato e malinconico, ideale per zone allungate come braccia, gambe o il tronco. Colori e dimensioni sono adattabili al corpo e alle esigenze personali.</p>','albero-it'),(30,3,10,'Tree','<p>A delicate and melancholic tattoo design, ideal for elongated areas such as arms, legs, or the torso. Both the colors and size can be adapted to fit the body and personal preferences.</p>','tree-en'),(31,1,11,'Montanha nas Costas','<p>Projeto de tatuagens abstratas e ornamentais, pensado para se moldar aos gestos e formas do corpo. As composições exploram ritmo, contraste e textura, criando desenhos únicos que se conectam com o movimento de quem os carrega. É possível adaptar o tamanho, a posição e os elementos gráficos de acordo com cada pessoa.</p>','montanhanascostas-pt'),(32,2,11,'Montagna sul Schiena','<p>Progetto di tatuaggi astratti e ornamentali, pensato per adattarsi ai gesti e alle forme naturali del corpo. Le composizioni esplorano ritmo, contrasto e texture, creando disegni unici che si connettono con il movimento di chi li indossa. Dimensioni, posizione ed elementi grafici possono essere personalizzati per ogni persona.</p>','montagnasulschiena-it'),(33,3,11,'Mountain on the Back','<p>Abstract and ornamental tattoo project, designed to follow the gestures and natural flow of the body. The compositions explore rhythm, contrast, and texture, creating unique pieces that connect with the movement of the wearer. Size, placement, and graphic elements can be customized for each person.</p>','mountainontheback'),(34,1,12,'Fissuras de Luz','<p><strong>Projeto de tatuagens abstrato-ornamentais</strong><br>Inspirada pelas tendências do neotribal, desenvolvi essa série mergulhando profundamente na temática. Os desenhos apresentam linhas finas e bem encaixadas às formas do corpo, revelando a minha linguagem pessoal de expressão. São como recortes delicados de luz — rachaduras ornamentais que atravessam a pele com leveza e movimento.</p>','fissurasdeluz-pt'),(35,2,12,'Crepe di Luce','<p><strong>Progetto di Tatuaggi Astratto-Ornamentali</strong><br>Ispirata dalle tendenze del neotribale, ho sviluppato questa serie immergendomi a fondo in questa tematica. I disegni presentano linee sottili che seguono armoniosamente le forme del corpo, rivelando il mio linguaggio espressivo personale. Somigliano a tagli delicati di luce — crepe ornamentali che attraversano la pelle con leggerezza e movimento.</p>','crepediluce-it'),(36,3,12,'Light Cracks','<p><strong>Abstract-Ornamental Tattoo Project</strong><br>Inspired by neotribal trends, I developed this series by diving deep into the theme. The designs feature fine lines that follow the natural flow of the body, revealing my personal language of expression. They resemble delicate cuts of light — ornamental cracks that cross the skin with softness and movement.</p>','lightcracks-en'),(37,1,13,'Fuir','<p>Uma composição abstrata inspirada no movimento contínuo e orgânico das formas sinuosas. Este projeto busca capturar a essência da fluidez, adaptando-se harmoniosamente às curvas naturais do corpo. As linhas suaves e interligadas criam uma sensação de movimento constante, simbolizando liberdade e transformação. É possível adaptar o tamanho, a posição e os elementos gráficos de acordo com cada pessoa.</p>','fluir-pt'),(38,2,13,'Fluire','<p>Una composizione astratta ispirata al movimento continuo e organico delle forme sinuose. Questo progetto mira a catturare l’essenza della fluidità, adattandosi armoniosamente alle curve naturali del corpo. Le linee morbide e interconnesse evocano una sensazione di movimento costante, simboleggiando libertà e trasformazione. Dimensioni, posizione ed elementi grafici possono essere adattati a ogni persona.</p>','fluire-it'),(39,3,13,'Flow','<p>An abstract composition inspired by the continuous and organic movement of sinuous shapes. This project aims to capture the essence of fluidity, harmoniously adapting to the body’s natural curves. The soft, interconnected lines evoke a sense of constant motion, symbolizing freedom and transformation. Size, placement, and graphic elements can be customized to suit each individual.</p>','flow-en'),(40,1,14,'Neo - Tribal','<p>Inspirada pelas tendências do neotribal, desenvolvi essa série mergulhando profundamente na temática. Os desenhos apresentam linhas finas e bem encaixadas às formas do corpo, revelando a minha linguagem pessoal de expressão. São como recortes delicados de luz — rachaduras ornamentais que atravessam a pele com leveza e movimento.</p>','neotribal-pt'),(41,2,14,'Neo-Tribale','<p>Ispirata dalle tendenze del neotribale, ho sviluppato questa serie immergendomi a fondo in questa tematica. I disegni presentano linee sottili che seguono armoniosamente le forme del corpo, rivelando il mio linguaggio espressivo personale. Somigliano a tagli delicati di luce — crepe ornamentali che attraversano la pelle con leggerezza e movimento.</p>','neotribale-it'),(42,3,14,'Neo - Tribal','<p>Inspired by neotribal trends, I developed this series by diving deep into the theme. The designs feature fine lines that follow the natural flow of the body, revealing my personal language of expression. They resemble delicate cuts of light — ornamental cracks that cross the skin with softness and movement.</p>','neotribal-en'),(43,1,15,'Mãos Ornamentos','<p>Desenhos abstratos, com formas mais rígidas e recortadas, pensados especialmente para as mãos. As composições valorizam o contraste com a pele e a estrutura óssea, criando um efeito gráfico marcante. São traços que cortam o espaço com precisão, trazendo uma sensação de força e expressão direta. As peças podem ser adaptadas ao tamanho e formato de cada mão.</p>','maosornamentais-pt'),(44,2,15,'Mani Ornamenti','<p>Una serie di disegni astratti con forme più rigide e ritagliate, pensati appositamente per le mani. Le composizioni valorizzano il contrasto con la pelle e la struttura ossea, creando un effetto grafico deciso. Sono tratti che attraversano lo spazio con precisione, evocando forza ed espressione diretta. Ogni progetto può essere adattato alla dimensione e forma di ogni mano.</p>','maniornamenti-it'),(45,3,15,'Hands Ornaments','<p>A series of abstract designs with sharper, cut-out shapes, created especially for the hands. The compositions highlight contrast with the skin and bone structure, resulting in a bold and graphic effect. These are lines that slice through space with precision, evoking a sense of strength and direct expression. Each piece can be adjusted to the size and shape of each hand.</p>','handsornaments-en'),(46,1,16,'Flores em Suspensão','<p>Essa série de desenhos explora flores em composições abstratas, onde as formas orgânicas ganham liberdade para se transformar. As pétalas se desfazem em gestos e texturas, criando imagens que flutuam entre o concreto e o imaginado. As tatuagens podem ser adaptadas para diferentes partes do corpo, acompanhando o movimento da pele com leveza e profundidade.</p>','floresemsuspensao-pt'),(47,2,16,'Fiori in Sospensione','<p>Questa serie esplora i fiori attraverso composizioni astratte, dove le forme organiche sono libere di trasformarsi. I petali si dissolvono in gesti e texture, creando immagini che fluttuano tra il concreto e l\'immaginato. I tatuaggi possono essere adattati a diverse zone del corpo, seguendo il movimento naturale della pelle con leggerezza e profondità.</p>','fioriinsospensione-it'),(48,3,16,'Suspended Flowers','<p>This series explores flowers through abstract compositions, where organic shapes are free to transform. Petals dissolve into gestures and textures, creating images that float between the concrete and the imagined. The tattoos can be adapted to different areas of the body, flowing with the skin’s natural movement in both softness and depth.</p>','suspendflowers-en'),(49,1,17,'Flor Abstrata','<p>Uma flor abstrata formada por manchas e gestos de aquarela, como se suas pétalas estivessem em processo de dissolução. A composição delicada e fluida se adapta com leveza a diferentes regiões do corpo, criando diálogos únicos com cada pele. É um desenho versátil, que une transparência e emoção em camadas sutis de cor.</p>','florabstrata-pt'),(50,2,17,'Fiore Astratto','<p>Un fiore astratto formato da macchie e gesti ad acquerello, come se i suoi petali si stessero lentamente dissolvendo. La composizione delicata e fluida si adatta con leggerezza a diverse zone del corpo, creando un dialogo unico con ogni pelle. Un disegno versatile che unisce trasparenze ed emozione in sottili strati di colore.</p>','fioreastrata-it'),(51,3,17,'Abstract Flower','<p>An abstract flower shaped by watercolor stains and gestures, as if its petals were gently dissolving. This delicate and fluid composition adapts effortlessly to various parts of the body, creating a unique dialogue with each person’s skin. A versatile design that blends transparency and emotion in subtle layers of color.</p>','abstractflower-en'),(52,1,18,'Panda Vermelho','<p>Este desenho delicado traz um panda vermelho, criatura de movimentos calmos e olhar atento. Entre o mistério e a doçura, ele simboliza a sensibilidade, o cuidado e o equilíbrio diante do mundo. Uma tatuagem para quem carrega dentro de si a força tranquila das coisas raras. Adaptável para diferentes partes do corpo, com possibilidades de ajustes em posição, tamanho e composição.</p>','pandavermelho-pt'),(53,2,18,'Panda Rosso','<p>Questo disegno delicato ritrae un panda rosso — creatura dai movimenti pacati e dallo sguardo attento. Tra il mistero e la dolcezza, simboleggia la sensibilità, la cura e l’equilibrio con cui si affronta il mondo. Un tatuaggio per chi porta dentro di sé la forza silenziosa delle cose rare. Adattabile a diverse parti del corpo, con possibilità di modificare posizione, dimensione e composizione.</p>','pandarosso-it'),(54,3,18,'Red Panda','<p>This delicate design features a red panda — a creature of gentle movement and attentive gaze. Between mystery and sweetness, it symbolizes sensitivity, care, and the balance one carries when facing the world. A tattoo for those who hold within the quiet strength of rare things. Adaptable to different parts of the body, with possibilities for changes in placement, size, and composition.</p>','redpanda-en'),(55,1,19,'Panda','<p>Este panda repousa sob um fundo amarelado, como se estivesse banhado por uma luz suave de fim de tarde. O desenho carrega uma atmosfera cálida e contemplativa, equilibrando ternura e introspecção. Uma tatuagem para quem encontra abrigo em si mesmo — onde o mundo interno brilha com calma e cor. Adaptável em tamanho e localização no corpo.</p>','panda-pt'),(56,2,19,'Panda','<p>Questo panda riposa su uno sfondo giallo, come se fosse avvolto da una luce morbida al tramonto. Il disegno trasmette un’atmosfera calda e contemplativa, equilibrando dolcezza e introspezione. Un tatuaggio per chi trova rifugio in sé stesso — dove il mondo interiore brilla con calma e colore. Adattabile in dimensioni e posizione sul corpo.</p>','panda-it'),(57,3,19,'Panda','<p>This panda rests against a yellow background, as if bathed in the soft light of a late afternoon. The design carries a warm and contemplative atmosphere, balancing tenderness and introspection. A tattoo for those who find refuge within themselves — where the inner world shines with calm and color. Adaptable in size and placement on the body.</p>','panda-en'),(58,1,20,'Inverno - A raposa e o passarinho','<p>Uma composição delicada que reúne uma raposa, um pássaro e ramos secos, conectados por uma atmosfera silenciosa de inverno. O desenho transmite a quietude dos dias frios, onde os encontros entre seres parecem carregados de significado. Cada elemento parece flutuar em meio ao vazio gelado, evocando introspecção, mistério e a beleza sutil da natureza em repouso. Ideal para quem se identifica com paisagens poéticas e animais que habitam as bordas entre o selvagem e o urbano.</p>','inverno-pt'),(59,2,20,'Invernia','<p>Una composizione delicata che unisce una volpe, un uccello e rami spogli, avvolti da un’atmosfera silenziosa d’inverno. Il disegno trasmette la quiete dei giorni freddi, in cui gli incontri tra creature sembrano carichi di significato. Ogni elemento sembra sospeso nel vuoto gelido, evocando introspezione, mistero e la bellezza sottile della natura a riposo. Ideale per chi si riconosce nei paesaggi poetici e negli animali che abitano i confini tra il selvatico e l’urbano.</p>','invernia-it'),(60,3,20,'Invernia','<p>A delicate composition featuring a fox, a bird, and bare branches, all wrapped in a quiet winter atmosphere. The design evokes the stillness of cold days, where encounters between creatures feel full of meaning. Each element seems to float within the frosty emptiness, suggesting introspection, mystery, and the subtle beauty of nature at rest. Ideal for those who feel connected to poetic landscapes and animals that live on the edges between the wild and the urban.</p>','invernia-en'),(61,1,21,'Serendipity','<p>Um desenho abstrato que fala sobre os encontros inesperados, os acasos que parecem ter sido escritos no tempo. É uma composição aberta, com movimentos suaves e interações sutis entre os elementos, refletindo a beleza de encontrar algo precioso sem estar procurando. Adaptável ao corpo, essa tatuagem carrega a poesia do imprevisto.</p>','serendipity-pt'),(62,2,21,'Serendipity','<p>Un disegno astratto che racconta gli incontri inaspettati — momenti di caso che sembrano scritti nel tempo. È una composizione aperta, con movimenti delicati e interazioni sottili tra gli elementi, che riflette la bellezza di trovare qualcosa di prezioso senza cercarlo. Adattabile al corpo, questo tatuaggio porta con sé la poesia dell’imprevisto.</p>','serendipity-it'),(63,3,21,'Serendipity','<p>An abstract design that speaks of unexpected encounters — chance moments that seem to have been written in time. It\'s an open composition, with soft movements and subtle interactions between elements, reflecting the beauty of finding something precious without looking for it. Adaptable to the body, this tattoo carries the poetry of the unforeseen.</p>','serendipity-en'),(64,1,22,'braceletes','<p>Esses braceletes nasceram da experimentação com formas feitas à mão, explorando como se encaixam no corpo em movimento. São desenhos flexíveis — a escala, as cores e os locais de aplicação podem ser adaptados conforme cada pessoa.</p>','bracelete-pt'),(65,2,22,'Bracciali','<p>Questi bracciali sono nati da un gioco di sperimentazione con forme realizzate a mano, esplorando il modo in cui si adattano al corpo in movimento. Sono disegni flessibili — la scala, i colori e la posizione possono essere modificati in base a ogni persona.</p>','bracciali-it'),(66,3,22,'Bracelets','<p>These bracelets were created through playful experimentation with hand-drawn forms, exploring how they fit the body in motion. They are flexible designs — the scale, colors, and placement can be adapted to each individual.</p>','bracelets-en');
/*!40000 ALTER TABLE `available_design_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_type_id` bigint unsigned NOT NULL,
  `active` tinyint DEFAULT '0',
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_content_type_id_foreign` (`content_type_id`),
  CONSTRAINT `category_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,1,1,'galacticcollage','2024-11-15 19:19:32','2025-04-15 18:20:24',NULL),(2,1,1,'ornamental','2024-11-15 19:19:32','2025-04-15 19:46:40',NULL),(3,1,1,'natureza-melancolica','2024-11-15 19:19:32','2025-04-16 11:20:17',NULL),(4,1,0,'abstratosornamentais','2025-04-16 13:29:28','2025-04-16 13:29:28',NULL),(5,1,0,'animais','2025-04-16 14:13:31','2025-04-16 14:13:31',NULL),(6,1,0,'figurativo','2025-04-17 16:25:59','2025-04-17 16:25:59',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_lang`
--

DROP TABLE IF EXISTS `category_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `language_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_lang_category_id_foreign` (`category_id`),
  KEY `category_lang_language_id_foreign` (`language_id`),
  CONSTRAINT `category_lang_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `category_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_lang`
--

LOCK TABLES `category_lang` WRITE;
/*!40000 ALTER TABLE `category_lang` DISABLE KEYS */;
INSERT INTO `category_lang` VALUES (1,1,1,'Colagens Galácticas','Colagens Galácticas'),(2,2,1,'Ornamentais','ornamentais'),(3,3,1,'Natureza Melancolica','natureza-melancolica'),(4,1,2,'Collage Galattici','Collage Galattici'),(5,2,2,'Categoria 2','categoria-2-it'),(6,2,2,'Ornamentale','ornamentale'),(7,1,3,'Galactic Collages','Galactic Collages'),(8,2,3,'Ornamental','ornamental'),(9,3,3,'Melancholic Nature','melancholic-nature'),(10,3,2,'Natura Malinconica','natura-malinconica'),(11,4,1,'Abstratos Ornamentais','abstratosornamentais-pt'),(12,4,2,'Astratti Ornamentali','astrattiornamentali-it'),(13,4,3,'Ornamental Abstracts','ornamentalabstracts-en'),(14,5,1,'Animais','animais-pt'),(15,5,2,'Animali','animali-it'),(16,5,3,'Animals','animals-en'),(17,6,1,'Figurativo','figurativo-pt'),(18,6,2,'Figurativo','figurativo-it'),(19,6,3,'Figurative','figurative-en');
/*!40000 ALTER TABLE `category_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_type_id` bigint unsigned NOT NULL,
  `firstname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_me_by` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tattoo_idea` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `references` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_content_type_id_foreign` (`content_type_id`),
  CONSTRAINT `contact_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_reference`
--

DROP TABLE IF EXISTS `contact_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_reference` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` bigint unsigned NOT NULL,
  `referenceable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referenceable_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_reference_contact_id_foreign` (`contact_id`),
  KEY `contact_reference_referenceable_type_referenceable_id_index` (`referenceable_type`,`referenceable_id`),
  CONSTRAINT `contact_reference_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_reference`
--

LOCK TABLES `contact_reference` WRITE;
/*!40000 ALTER TABLE `contact_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_media`
--

DROP TABLE IF EXISTS `content_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `media_id` bigint unsigned NOT NULL,
  `content_id` int NOT NULL,
  `content_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_media_media_id_foreign` (`media_id`),
  CONSTRAINT `content_media_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_media`
--

LOCK TABLES `content_media` WRITE;
/*!40000 ALTER TABLE `content_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_type`
--

DROP TABLE IF EXISTS `content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_type` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_type`
--

LOCK TABLES `content_type` WRITE;
/*!40000 ALTER TABLE `content_type` DISABLE KEYS */;
INSERT INTO `content_type` VALUES (1,'tattoo','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(2,'painting','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL);
/*!40000 ALTER TABLE `content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucional`
--

DROP TABLE IF EXISTS `institucional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucional` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_type_id` bigint unsigned NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `institucional_content_type_id_foreign` (`content_type_id`),
  CONSTRAINT `institucional_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucional`
--

LOCK TABLES `institucional` WRITE;
/*!40000 ALTER TABLE `institucional` DISABLE KEYS */;
INSERT INTO `institucional` VALUES (1,1,'solztt-universe','2024-11-15 19:19:32','2025-04-18 18:48:41',NULL),(2,1,'appointment-1','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(3,1,'appointment-2','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(4,1,'appointment-3','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(5,1,'tattoo-book-text','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(6,1,'criative-process','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(7,1,'consideration','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(8,1,'payment-methods','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(9,1,'warning','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL);
/*!40000 ALTER TABLE `institucional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucional_lang`
--

DROP TABLE IF EXISTS `institucional_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucional_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institucional_id` bigint unsigned NOT NULL,
  `language_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `institucional_lang_institucional_id_foreign` (`institucional_id`),
  KEY `institucional_lang_language_id_foreign` (`language_id`),
  CONSTRAINT `institucional_lang_institucional_id_foreign` FOREIGN KEY (`institucional_id`) REFERENCES `institucional` (`id`),
  CONSTRAINT `institucional_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucional_lang`
--

LOCK TABLES `institucional_lang` WRITE;
/*!40000 ALTER TABLE `institucional_lang` DISABLE KEYS */;
INSERT INTO `institucional_lang` VALUES (1,1,1,'O Universo Solztt','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','o-universo-solztt'),(2,2,1,'Clique no botão abaixo','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','clique-no-botao-abaixo'),(3,3,1,'Preencha o formulário','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','preencha-o-formulario'),(4,4,1,'Agendamento','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','agendamento'),(5,9,1,'Atenção','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','atencao'),(6,5,1,'Texto 1 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','texto-1-contato'),(7,6,1,'Texto 2 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','texto-2-contato'),(8,7,1,'Texto 3 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','texto-3-contato'),(9,8,1,'Texto 4 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','texto-4-contato'),(10,1,2,'L\'Universo Solztt','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','luniverso-solztt'),(11,2,2,'Fare clic sul pulsante qui sotto','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','fare-clic-sul-pulsante-qui-sotto'),(12,3,2,'Compila il modulo','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','compila-il-modulo'),(13,4,2,'Pianificazione','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','pianificazione'),(14,9,2,'Attenzione','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','attenzione'),(15,5,2,'Testo 1 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','testo-1-contato'),(16,6,2,'Testo 2 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','testo-2-contato'),(17,7,2,'Testo 3 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','testo-3-contato'),(18,8,2,'Testo 4 contato','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','testo-4-contato'),(19,1,3,'Solztt Universe','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','solztt-universe'),(20,2,3,'Click the button below','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','click-the-button-below'),(21,3,3,'Fill out the form','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','fill-out-the-form'),(22,4,3,'Book','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','book'),(23,9,3,'Warning','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','warning'),(24,5,3,'Text 1 contact','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','text-1-contact'),(25,6,3,'Text 2 contact','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','text-2-contact'),(26,7,3,'Text 3 contact','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','text-3-contact'),(27,8,3,'Text 4 contact','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','text-4-contact');
/*!40000 ALTER TABLE `institucional_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint NOT NULL DEFAULT '0',
  `slug` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'Português Brasil',0,'pt','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(2,'Italiano',0,'it','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL),(3,'English',1,'en','2024-11-15 19:19:32','2024-11-15 19:19:32',NULL);
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversions_disk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint unsigned NOT NULL,
  `manipulations` json NOT NULL,
  `custom_properties` json NOT NULL,
  `generated_conversions` json NOT NULL,
  `responsive_images` json NOT NULL,
  `order_column` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_uuid_unique` (`uuid`),
  KEY `media_model_type_model_id_index` (`model_type`,`model_id`),
  KEY `media_order_column_index` (`order_column`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (11,'App\\Models\\Portfolio',1,'8c1b7442-88f1-45ba-bde7-bfe488fcd9f5','portfolio','14','14.jpeg','image/jpeg','s3','s3',71616,'[]','[]','[]','[]',7,'2025-01-14 14:38:34','2025-04-16 12:34:45'),(12,'App\\Models\\Portfolio',1,'979f15e5-ddcc-4f21-86eb-4e68e7c098a8','portfolio','12','12.jpeg','image/jpeg','s3','s3',86125,'[]','[]','[]','[]',9,'2025-01-14 14:38:34','2025-04-16 12:34:45'),(13,'App\\Models\\Portfolio',1,'8899342e-2984-4a5a-ae7e-ca091c60a431','portfolio','13','13.jpeg','image/jpeg','s3','s3',154763,'[]','[]','[]','[]',8,'2025-01-14 14:38:34','2025-04-16 12:34:45'),(27,'App\\Models\\AvailableDesign',1,'04694446-a2c1-4c5d-b73e-760e280a4e8b','availableDesigns','1','1.JPG','image/jpeg','s3','s3',944236,'[]','[]','[]','[]',1,'2025-04-15 18:10:48','2025-04-15 18:26:52'),(28,'App\\Models\\AvailableDesign',1,'e3989680-3e25-4a90-97d6-29e82907b91f','availableDesigns','2','2.JPG','image/jpeg','s3','s3',902543,'[]','[]','[]','[]',2,'2025-04-15 18:10:48','2025-04-15 18:26:53'),(29,'App\\Models\\AvailableDesign',1,'2e5c36f4-0b0a-4634-8e18-68b4d7cb11c4','availableDesigns','3','3.JPG','image/jpeg','s3','s3',779486,'[]','[]','[]','[]',3,'2025-04-15 18:10:48','2025-04-15 18:26:54'),(30,'App\\Models\\AvailableDesign',2,'f958e4a8-fe59-41ea-b8af-7548015aa308','availableDesigns','IMG_5811','IMG_5811.JPG','image/jpeg','s3','s3',931685,'[]','[]','[]','[]',1,'2025-04-15 19:06:11','2025-04-15 19:06:11'),(31,'App\\Models\\AvailableDesign',2,'15dcc781-de7b-40de-8745-e324eb657b28','availableDesigns','IMG_5816','IMG_5816.JPG','image/jpeg','s3','s3',849392,'[]','[]','[]','[]',2,'2025-04-15 19:06:11','2025-04-15 19:06:11'),(32,'App\\Models\\AvailableDesign',2,'f5d1d019-dd86-44c0-b387-dee16398b6f7','availableDesigns','IMG_5817','IMG_5817.JPG','image/jpeg','s3','s3',849623,'[]','[]','[]','[]',3,'2025-04-15 19:06:11','2025-04-15 19:06:11'),(33,'App\\Models\\AvailableDesign',3,'3c74902f-a503-4e5a-8253-8b6e2f2e6035','availableDesigns','IMG_5821','IMG_5821.JPG','image/jpeg','s3','s3',952513,'[]','[]','[]','[]',1,'2025-04-15 19:15:11','2025-04-15 19:15:11'),(34,'App\\Models\\AvailableDesign',3,'8948c247-9fa7-414f-a230-fb1a2fac16da','availableDesigns','IMG_5822','IMG_5822.JPG','image/jpeg','s3','s3',761075,'[]','[]','[]','[]',2,'2025-04-15 19:15:11','2025-04-15 19:15:11'),(35,'App\\Models\\AvailableDesign',3,'a0796e04-db0f-4562-be20-1c9f19e238e6','availableDesigns','IMG_5844','IMG_5844.JPG','image/jpeg','s3','s3',442446,'[]','[]','[]','[]',3,'2025-04-15 19:15:11','2025-04-15 19:15:11'),(36,'App\\Models\\AvailableDesign',4,'ab331f44-4d48-46b5-b17f-f9f06b10a836','availableDesigns','IMG_5823','IMG_5823.JPG','image/jpeg','s3','s3',944527,'[]','[]','[]','[]',1,'2025-04-15 19:19:56','2025-04-15 19:19:56'),(37,'App\\Models\\AvailableDesign',4,'08cc31ac-ca7c-45ea-9c54-fed0cc6010c5','availableDesigns','IMG_5824','IMG_5824.JPG','image/jpeg','s3','s3',827854,'[]','[]','[]','[]',2,'2025-04-15 19:19:56','2025-04-15 19:19:56'),(38,'App\\Models\\AvailableDesign',5,'12ae0da4-5f12-4a3f-9ef4-2c1af1f97eaa','availableDesigns','IMG_5815','IMG_5815.JPG','image/jpeg','s3','s3',808821,'[]','[]','[]','[]',1,'2025-04-15 19:20:58','2025-04-15 19:20:58'),(39,'App\\Models\\AvailableDesign',5,'a548511d-9b38-4312-af10-c2768d32eb3e','availableDesigns','IMG_5825','IMG_5825.JPG','image/jpeg','s3','s3',892588,'[]','[]','[]','[]',2,'2025-04-15 19:20:58','2025-04-15 19:20:58'),(40,'App\\Models\\AvailableDesign',6,'bdf4c2ff-0d67-4167-936e-b693c2bda405','availableDesigns','IMG_5819','IMG_5819.JPG','image/jpeg','s3','s3',640377,'[]','[]','[]','[]',2,'2025-04-15 19:24:21','2025-04-15 19:25:49'),(41,'App\\Models\\AvailableDesign',6,'c37de4d0-7492-4ca9-a526-22c88e5daac3','availableDesigns','IMG_5820','IMG_5820.JPG','image/jpeg','s3','s3',749957,'[]','[]','[]','[]',3,'2025-04-15 19:24:21','2025-04-15 19:25:49'),(42,'App\\Models\\AvailableDesign',6,'4c9181f7-28de-48c6-9456-b6e7da71b0f8','availableDesigns','IMG_5864','IMG_5864.JPG','image/jpeg','s3','s3',875069,'[]','[]','[]','[]',1,'2025-04-15 19:24:21','2025-04-15 19:25:49'),(43,'App\\Models\\Portfolio',1,'4ec886a7-fbf0-4c13-bf03-8a6b90a6ed36','portfolio','IMG_2912','IMG_2912.JPEG','image/jpeg','s3','s3',739197,'[]','[]','[]','[]',1,'2025-04-16 11:38:47','2025-04-16 11:41:14'),(44,'App\\Models\\Portfolio',1,'4560f4c3-565e-4b89-8181-377b2cc71479','portfolio','IMG_2916','IMG_2916.JPEG','image/jpeg','s3','s3',741287,'[]','[]','[]','[]',3,'2025-04-16 11:38:48','2025-04-16 12:34:45'),(45,'App\\Models\\Portfolio',1,'c8241fa2-30ea-4e3a-a93b-82bd8001ed97','portfolio','IMG_2936','IMG_2936.JPEG','image/jpeg','s3','s3',676881,'[]','[]','[]','[]',6,'2025-04-16 11:38:48','2025-04-16 12:34:45'),(46,'App\\Models\\Portfolio',1,'36a95c44-4157-4f8f-839a-94d1a4d82c9e','portfolio','IMG_2940','IMG_2940.JPEG','image/jpeg','s3','s3',835356,'[]','[]','[]','[]',4,'2025-04-16 11:38:48','2025-04-16 12:34:45'),(47,'App\\Models\\Portfolio',1,'38cc8cbb-e3de-4baa-b8c6-7cfb935517b3','portfolio','IMG_2942','IMG_2942.JPEG','image/jpeg','s3','s3',683501,'[]','[]','[]','[]',2,'2025-04-16 11:38:48','2025-04-16 12:34:45'),(48,'App\\Models\\Portfolio',1,'a8ced0da-f196-473f-b2fe-4da4485e8632','portfolio','IMG_2973','IMG_2973.JPEG','image/jpeg','s3','s3',720786,'[]','[]','[]','[]',5,'2025-04-16 11:38:48','2025-04-16 12:34:45'),(49,'App\\Models\\Portfolio',2,'22ed85ff-5540-4765-a26c-789a6930031c','portfolio','1','1.jpg','image/jpeg','s3','s3',1986630,'[]','[]','[]','[]',4,'2025-04-16 12:57:15','2025-04-16 16:51:49'),(50,'App\\Models\\Portfolio',2,'5bb884aa-9b74-4f60-82e5-d94110679b30','portfolio','_DSC7681-min','_DSC7681-min.JPG','image/jpeg','s3','s3',818125,'[]','[]','[]','[]',1,'2025-04-16 12:57:15','2025-04-16 16:51:49'),(51,'App\\Models\\Portfolio',2,'1b3d46b3-5994-4eaf-ab20-4dc208abaf39','portfolio','_DSC7683-min','_DSC7683-min.JPG','image/jpeg','s3','s3',843593,'[]','[]','[]','[]',2,'2025-04-16 12:57:15','2025-04-16 16:51:49'),(52,'App\\Models\\Portfolio',2,'de5dec51-ee19-40ec-9abf-0f373aa7af0d','portfolio','_DSC7686-min','_DSC7686-min.JPG','image/jpeg','s3','s3',877068,'[]','[]','[]','[]',3,'2025-04-16 12:57:15','2025-04-16 16:51:49'),(53,'App\\Models\\AvailableDesign',7,'b67d3e33-97cf-4d83-a783-a21e28caf833','availableDesigns','IMG_3929','IMG_3929.JPG','image/jpeg','s3','s3',674924,'[]','[]','[]','[]',1,'2025-04-16 13:08:12','2025-04-16 13:08:12'),(54,'App\\Models\\AvailableDesign',7,'50d902ca-235c-41ec-9746-6d1beddd7047','availableDesigns','IMG_2768','IMG_2768.JPG','image/jpeg','s3','s3',695897,'[]','[]','[]','[]',2,'2025-04-16 13:08:12','2025-04-16 13:08:12'),(55,'App\\Models\\AvailableDesign',8,'b1ec86c0-2174-468d-b5f9-425a89ff5b57','availableDesigns','IMG_3933','IMG_3933.JPG','image/jpeg','s3','s3',703088,'[]','[]','[]','[]',1,'2025-04-16 13:15:49','2025-04-16 13:15:49'),(56,'App\\Models\\AvailableDesign',9,'34ce1193-c4a8-4ae3-8b49-f411a3b1167f','availableDesigns','IMG_3932','IMG_3932.JPG','image/jpeg','s3','s3',664242,'[]','[]','[]','[]',1,'2025-04-16 13:23:23','2025-04-16 13:23:23'),(57,'App\\Models\\AvailableDesign',10,'ea574a88-896a-49da-9688-284a155331ba','availableDesigns','IMG_3930','IMG_3930.JPG','image/jpeg','s3','s3',673212,'[]','[]','[]','[]',1,'2025-04-16 13:26:43','2025-04-16 13:26:43'),(58,'App\\Models\\AvailableDesign',11,'3e78f18e-79c9-49d0-8982-e3c1ea780623','availableDesigns','IMG_5607','IMG_5607.JPG','image/jpeg','s3','s3',722276,'[]','[]','[]','[]',1,'2025-04-16 13:34:29','2025-04-16 13:34:29'),(59,'App\\Models\\AvailableDesign',12,'21c9ea09-9043-4777-9b14-130d6713d1d1','availableDesigns','IMG_5594','IMG_5594.JPG','image/jpeg','s3','s3',774946,'[]','[]','[]','[]',1,'2025-04-16 13:41:49','2025-04-16 13:41:49'),(60,'App\\Models\\AvailableDesign',12,'7181279c-3036-4d87-ac73-1c531295ca21','availableDesigns','IMG_5602','IMG_5602.JPG','image/jpeg','s3','s3',587289,'[]','[]','[]','[]',2,'2025-04-16 13:41:49','2025-04-16 13:41:49'),(61,'App\\Models\\AvailableDesign',12,'6fe3eeb9-bbec-49df-92b7-dcc5a44a1982','availableDesigns','IMG_5604','IMG_5604.JPG','image/jpeg','s3','s3',544245,'[]','[]','[]','[]',3,'2025-04-16 13:41:49','2025-04-16 13:41:49'),(62,'App\\Models\\AvailableDesign',13,'0a0840ed-5bbd-4aa5-9d68-8ab8d3d2c9cf','availableDesigns','IMG_5592','IMG_5592.JPG','image/jpeg','s3','s3',801005,'[]','[]','[]','[]',3,'2025-04-16 13:50:25','2025-04-16 13:55:13'),(63,'App\\Models\\AvailableDesign',13,'ff3750c8-7d87-4870-b940-023474f61410','availableDesigns','IMG_5600','IMG_5600.JPG','image/jpeg','s3','s3',886735,'[]','[]','[]','[]',2,'2025-04-16 13:50:25','2025-04-16 13:55:13'),(64,'App\\Models\\AvailableDesign',13,'e5a4c343-b7cb-4d02-bf7a-9b23c09e44a8','availableDesigns','IMG_5601','IMG_5601.JPG','image/jpeg','s3','s3',884093,'[]','[]','[]','[]',1,'2025-04-16 13:50:25','2025-04-16 13:55:13'),(65,'App\\Models\\AvailableDesign',14,'9700b0d8-3020-468a-9910-cca8c9fbdf0c','availableDesigns','IMG_5429','IMG_5429.JPG','image/jpeg','s3','s3',754527,'[]','[]','[]','[]',3,'2025-04-16 13:53:27','2025-04-16 13:56:00'),(66,'App\\Models\\AvailableDesign',14,'09cfffa7-69bf-49e2-a157-151d39c9cf93','availableDesigns','IMG_5433','IMG_5433.JPG','image/jpeg','s3','s3',673853,'[]','[]','[]','[]',2,'2025-04-16 13:53:28','2025-04-16 13:56:00'),(67,'App\\Models\\AvailableDesign',14,'0c6a896f-12c0-4a95-ac9d-e647834c7752','availableDesigns','IMG_5590','IMG_5590.JPG','image/jpeg','s3','s3',837376,'[]','[]','[]','[]',1,'2025-04-16 13:53:28','2025-04-16 13:55:58'),(68,'App\\Models\\AvailableDesign',15,'0cefbe0a-2a97-44dd-b2c9-45a590ffbc63','availableDesigns','IMG_5504','IMG_5504.JPG','image/jpeg','s3','s3',752768,'[]','[]','[]','[]',1,'2025-04-16 14:00:39','2025-04-16 14:00:39'),(69,'App\\Models\\AvailableDesign',15,'47a60800-e2dd-4ad1-9a8b-3013f1d4773e','availableDesigns','IMG_5505','IMG_5505.JPG','image/jpeg','s3','s3',767537,'[]','[]','[]','[]',2,'2025-04-16 14:00:39','2025-04-16 14:00:39'),(70,'App\\Models\\AvailableDesign',15,'fa3e3e95-c9a1-4da2-a8e8-bcb56c7c2480','availableDesigns','IMG_5506','IMG_5506.JPG','image/jpeg','s3','s3',754140,'[]','[]','[]','[]',3,'2025-04-16 14:00:39','2025-04-16 14:00:39'),(71,'App\\Models\\AvailableDesign',16,'4617f043-4405-4b68-98e5-5caa249b4e0e','availableDesigns','IMG_5589','IMG_5589.JPG','image/jpeg','s3','s3',864533,'[]','[]','[]','[]',3,'2025-04-16 14:06:32','2025-04-16 14:08:05'),(72,'App\\Models\\AvailableDesign',16,'b1c7a416-df77-4db0-95ba-7c0e19dca829','availableDesigns','IMG_5593','IMG_5593.JPG','image/jpeg','s3','s3',763666,'[]','[]','[]','[]',2,'2025-04-16 14:06:32','2025-04-16 14:08:05'),(73,'App\\Models\\AvailableDesign',16,'de9c0e55-f88c-4fc6-bcd8-4d5e076a5941','availableDesigns','IMG_5603','IMG_5603.JPG','image/jpeg','s3','s3',551905,'[]','[]','[]','[]',1,'2025-04-16 14:06:32','2025-04-16 14:08:05'),(74,'App\\Models\\AvailableDesign',17,'a0686608-dcab-438d-88ba-712e08033284','availableDesigns','IMG_5589','IMG_5589.JPG','image/jpeg','s3','s3',864533,'[]','[]','[]','[]',1,'2025-04-16 14:11:51','2025-04-16 14:11:51'),(75,'App\\Models\\Portfolio',3,'23435e63-b2bb-4666-9e89-689cf55a5edb','portfolio','site 5','site-5.JPEG','image/jpeg','s3','s3',708650,'[]','[]','[]','[]',1,'2025-04-16 16:04:47','2025-04-16 16:04:47'),(76,'App\\Models\\Portfolio',3,'202cc976-89a7-44a9-bd0e-dad68e07ddae','portfolio','site 6','site-6.JPEG','image/jpeg','s3','s3',636049,'[]','[]','[]','[]',2,'2025-04-16 16:04:47','2025-04-16 16:04:47'),(77,'App\\Models\\Portfolio',3,'e7538b93-7e74-4d5b-832e-a51678473658','portfolio','site','site.jpg','image/jpeg','s3','s3',1944497,'[]','[]','[]','[]',3,'2025-04-16 16:04:47','2025-04-16 16:04:47'),(78,'App\\Models\\Portfolio',6,'ca808cc0-08b9-472c-9236-3c71af5f0079','portfolio','DSC00931','DSC00931.JPG','image/jpeg','s3','s3',480815,'[]','[]','[]','[]',1,'2025-04-16 16:45:47','2025-04-16 16:45:47'),(79,'App\\Models\\Portfolio',6,'08245780-0938-45a2-b529-92f21c082ce2','portfolio','DSC00932','DSC00932.JPG','image/jpeg','s3','s3',485282,'[]','[]','[]','[]',2,'2025-04-16 16:45:47','2025-04-16 16:45:47'),(80,'App\\Models\\Portfolio',6,'48a3ba31-a493-4779-8286-eca8ccdd7561','portfolio','DSC00933','DSC00933.JPG','image/jpeg','s3','s3',546229,'[]','[]','[]','[]',3,'2025-04-16 16:45:47','2025-04-16 16:45:47'),(81,'App\\Models\\Portfolio',6,'74062a6e-af34-4919-843d-1449bb47e660','portfolio','DSC00936','DSC00936.JPG','image/jpeg','s3','s3',493707,'[]','[]','[]','[]',4,'2025-04-16 16:45:47','2025-04-16 16:45:47'),(82,'App\\Models\\Portfolio',7,'4bc35d8b-f989-4c46-bd56-a9f543f30adb','portfolio','IMG_1916_Original','IMG_1916_Original.jpg','image/jpeg','s3','s3',598661,'[]','[]','[]','[]',1,'2025-04-16 16:51:11','2025-04-16 16:51:11'),(83,'App\\Models\\Portfolio',7,'a135f94b-1146-46be-b900-91f76d27a4ce','portfolio','IMG_1917_Original(1)','IMG_1917_Original(1).jpg','image/jpeg','s3','s3',633808,'[]','[]','[]','[]',2,'2025-04-16 16:51:11','2025-04-16 16:51:11'),(84,'App\\Models\\AvailableDesign',18,'35fd6e4a-be4d-4eeb-ac62-6882dbae5834','availableDesigns','IMG_5675','IMG_5675.JPG','image/jpeg','s3','s3',975153,'[]','[]','[]','[]',2,'2025-04-16 17:00:17','2025-04-16 17:04:50'),(85,'App\\Models\\AvailableDesign',18,'cc4f5b50-8f13-4ef9-9ad1-ecc0452e4ae6','availableDesigns','IMG_5676','IMG_5676.JPG','image/jpeg','s3','s3',897277,'[]','[]','[]','[]',1,'2025-04-16 17:00:18','2025-04-16 17:04:50'),(86,'App\\Models\\AvailableDesign',18,'8a011b5e-ff9f-4f50-8fe8-05d99754c751','availableDesigns','IMG_5686','IMG_5686.JPG','image/jpeg','s3','s3',1041202,'[]','[]','[]','[]',3,'2025-04-16 17:00:18','2025-04-16 17:00:18'),(87,'App\\Models\\AvailableDesign',19,'77657a73-55a9-4e64-878a-2cea68678e6d','availableDesigns','IMG_5702','IMG_5702.JPG','image/jpeg','s3','s3',890727,'[]','[]','[]','[]',2,'2025-04-16 17:03:50','2025-04-16 17:05:53'),(88,'App\\Models\\AvailableDesign',19,'3ac6dc84-a79d-4f87-a78d-58c862f7b229','availableDesigns','IMG_5703','IMG_5703.JPG','image/jpeg','s3','s3',847775,'[]','[]','[]','[]',1,'2025-04-16 17:03:50','2025-04-16 17:05:53'),(89,'App\\Models\\AvailableDesign',20,'88bf31ed-dcb2-4552-aa7d-853df80278b0','availableDesigns','IMG_5104','IMG_5104.JPG','image/jpeg','s3','s3',1455938,'[]','[]','[]','[]',1,'2025-04-17 06:48:54','2025-04-17 06:48:54'),(90,'App\\Models\\AvailableDesign',21,'f2a64fb8-98cd-4884-820e-98677d92dfa8','availableDesigns','IMG_4881','IMG_4881.JPG','image/jpeg','s3','s3',1311226,'[]','[]','[]','[]',1,'2025-04-17 14:51:18','2025-04-17 14:51:18'),(91,'App\\Models\\AvailableDesign',21,'5a810a45-9f6e-4d2d-b0ec-52af625f88da','availableDesigns','IMG_4895','IMG_4895.JPG','image/jpeg','s3','s3',1414142,'[]','[]','[]','[]',2,'2025-04-17 14:51:18','2025-04-17 14:51:18'),(92,'App\\Models\\AvailableDesign',22,'fb387f90-3308-4523-964e-4be893623f6e','availableDesigns','IMG_4896','IMG_4896.JPG','image/jpeg','s3','s3',1332727,'[]','[]','[]','[]',1,'2025-04-17 14:59:06','2025-04-17 14:59:06'),(93,'App\\Models\\AvailableDesign',22,'ee7a31c0-2f2d-4fe3-afe1-877cf7684c77','availableDesigns','IMG_4939','IMG_4939.JPG','image/jpeg','s3','s3',1277729,'[]','[]','[]','[]',2,'2025-04-17 14:59:07','2025-04-17 14:59:07'),(94,'App\\Models\\AvailableDesign',22,'74ca22a6-d92d-4dd5-b46f-27c0c735c459','availableDesigns','IMG_4940','IMG_4940.JPG','image/jpeg','s3','s3',1273593,'[]','[]','[]','[]',3,'2025-04-17 14:59:07','2025-04-17 14:59:07'),(95,'App\\Models\\AvailableDesign',22,'312bc0b3-9e65-4ecc-934e-1a373e98919b','availableDesigns','IMG_4966','IMG_4966.JPG','image/jpeg','s3','s3',929025,'[]','[]','[]','[]',4,'2025-04-17 14:59:07','2025-04-17 14:59:07'),(96,'App\\Models\\Portfolio',4,'bfdd3e4e-9606-426f-a42a-f4d0b536003e','portfolio','IMG_1934_jpg-min','IMG_1934_jpg-min.jpeg','image/jpeg','s3','s3',1507171,'[]','[]','[]','[]',1,'2025-04-17 15:32:59','2025-04-17 15:32:59'),(97,'App\\Models\\Portfolio',4,'f62fbd24-85fc-4bad-aa41-208efdb082e2','portfolio','IMG_1916_jpg-min','IMG_1916_jpg-min.jpeg','image/jpeg','s3','s3',1802294,'[]','[]','[]','[]',2,'2025-04-17 15:32:59','2025-04-17 15:32:59'),(98,'App\\Models\\Portfolio',5,'e1380816-ceae-4565-b1d8-43e1682eb775','portfolio','_DSC9834','_DSC9834.jpg','image/jpeg','s3','s3',1619495,'[]','[]','[]','[]',1,'2025-04-17 15:40:03','2025-04-17 15:40:03'),(99,'App\\Models\\Portfolio',5,'b9031e7d-e17e-4be0-b5a0-b4250d61553a','portfolio','_DSC9841','_DSC9841.jpg','image/jpeg','s3','s3',946035,'[]','[]','[]','[]',2,'2025-04-17 15:40:03','2025-04-17 15:40:03'),(100,'App\\Models\\Portfolio',8,'8554bbe2-5182-4c81-8bcc-c06b861472c0','portfolio','IMG_2282_jpg-min','IMG_2282_jpg-min.jpg','image/jpeg','s3','s3',1016448,'[]','[]','[]','[]',1,'2025-04-17 15:54:11','2025-04-17 15:54:11'),(101,'App\\Models\\Portfolio',8,'6a9566e0-773b-4f6f-bdff-4512b6d840e8','portfolio','IMG_2292_jpg-min','IMG_2292_jpg-min.jpg','image/jpeg','s3','s3',1316082,'[]','[]','[]','[]',2,'2025-04-17 15:54:11','2025-04-17 15:54:11'),(102,'App\\Models\\Portfolio',8,'086b6592-c85a-4910-901f-330a20570bc4','portfolio','IMG_2339_jpg-min','IMG_2339_jpg-min.jpg','image/jpeg','s3','s3',1714919,'[]','[]','[]','[]',3,'2025-04-17 15:54:11','2025-04-17 15:54:11'),(103,'App\\Models\\Portfolio',9,'acd249d6-82b0-4811-aa12-1dd8d240170f','portfolio','DSC00865','DSC00865.JPG','image/jpeg','s3','s3',397313,'[]','[]','[]','[]',1,'2025-04-17 16:07:55','2025-04-17 16:07:55'),(104,'App\\Models\\Portfolio',9,'3cdadf86-a91a-4b65-bf04-9960e1d434a9','portfolio','DSC00868(3)','DSC00868(3).jpg','image/jpeg','s3','s3',275912,'[]','[]','[]','[]',2,'2025-04-17 16:07:55','2025-04-17 16:07:55'),(105,'App\\Models\\Portfolio',9,'d85dbda8-d4e9-40de-9c8c-cac1d1d4b386','portfolio','DSC00873','DSC00873.JPG','image/jpeg','s3','s3',409923,'[]','[]','[]','[]',3,'2025-04-17 16:07:55','2025-04-17 16:07:55'),(106,'App\\Models\\Portfolio',9,'9f8017ce-aba2-40aa-8d6d-d1b25558eae2','portfolio','DSC00872','DSC00872.JPG','image/jpeg','s3','s3',390689,'[]','[]','[]','[]',4,'2025-04-17 16:07:55','2025-04-17 16:07:55'),(107,'App\\Models\\Portfolio',10,'bb07b8b1-5ee0-4651-9541-5f89c297f65a','portfolio','DSC00417','DSC00417.JPG','image/jpeg','s3','s3',434369,'[]','[]','[]','[]',1,'2025-04-17 16:12:51','2025-04-17 16:12:51'),(108,'App\\Models\\Portfolio',10,'3c5c5f73-dd1a-47b7-b810-a480b7cb4446','portfolio','DSC00418','DSC00418.JPG','image/jpeg','s3','s3',480459,'[]','[]','[]','[]',2,'2025-04-17 16:12:51','2025-04-17 16:12:51'),(109,'App\\Models\\Portfolio',10,'1f68879f-5e0c-42ba-b8d5-c765357adefb','portfolio','DSC00419','DSC00419.JPG','image/jpeg','s3','s3',435578,'[]','[]','[]','[]',3,'2025-04-17 16:12:51','2025-04-17 16:12:51'),(110,'App\\Models\\Portfolio',10,'303e12b7-b5c5-4d38-8b24-b79761c35d0d','portfolio','DSC00422','DSC00422.JPG','image/jpeg','s3','s3',384878,'[]','[]','[]','[]',4,'2025-04-17 16:12:51','2025-04-17 16:12:51'),(111,'App\\Models\\Portfolio',11,'6e5b1fc8-f582-4665-9695-3ee6466c4560','portfolio','IMG_2156-min','IMG_2156-min.jpg','image/jpeg','s3','s3',1520692,'[]','[]','[]','[]',4,'2025-04-17 16:29:34','2025-04-17 16:34:11'),(112,'App\\Models\\Portfolio',11,'287763e8-b037-438b-898b-c908c0a8f4f5','portfolio','IMG_2164-min','IMG_2164-min.jpg','image/jpeg','s3','s3',1493153,'[]','[]','[]','[]',1,'2025-04-17 16:29:34','2025-04-17 16:34:08'),(113,'App\\Models\\Portfolio',11,'d54861f6-4663-4ff8-adeb-0318b0e135a2','portfolio','IMG_2165-min','IMG_2165-min.jpg','image/jpeg','s3','s3',1514840,'[]','[]','[]','[]',2,'2025-04-17 16:29:34','2025-04-17 16:34:11'),(114,'App\\Models\\Portfolio',11,'be06b8ef-2051-4ed5-86cc-610921badf57','portfolio','IMG_2185-min','IMG_2185-min.jpg','image/jpeg','s3','s3',1634761,'[]','[]','[]','[]',3,'2025-04-17 16:29:34','2025-04-17 16:34:11'),(116,'App\\Models\\Institucional',1,'2ccf8925-d214-4a85-b594-ee7a5b55b504','institucional','_DSC0697','_DSC0697.jpg','image/jpeg','s3','s3',743369,'[]','[]','[]','[]',2,'2025-04-18 18:48:41','2025-04-18 18:48:41');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_description_lang`
--

DROP TABLE IF EXISTS `media_description_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_description_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `language_id` bigint unsigned NOT NULL,
  `media_id` bigint unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_description_lang_language_id_foreign` (`language_id`),
  KEY `media_description_lang_media_id_foreign` (`media_id`),
  CONSTRAINT `media_description_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  CONSTRAINT `media_description_lang_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_description_lang`
--

LOCK TABLES `media_description_lang` WRITE;
/*!40000 ALTER TABLE `media_description_lang` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_description_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2024_03_14_101742_create_language_table',1),(6,'2024_03_14_102639_create_content_type_table',1),(7,'2024_03_14_102929_create_institucional_table',1),(8,'2024_03_14_111821_create_category_table',1),(9,'2024_03_14_112021_create_portfolio_table',1),(10,'2024_03_14_112819_create_media_table',1),(11,'2024_03_14_112949_create_media_description_lang',1),(12,'2024_03_14_113649_create_content_media',1),(13,'2024_03_14_113907_create_social_table',1),(14,'2024_03_14_114011_create_site_setting_table',1),(15,'2024_08_02_132134_create_institucional_lang_table',1),(16,'2024_08_02_132400_create_contact_table',1),(17,'2024_08_02_133232_create_portfolio_lang_table',1),(18,'2024_08_02_133334_create_category_lang_table',1),(19,'2024_08_15_134326_add_description_to_portfolio_lang_table',1),(20,'2024_08_15_144313_create_available_design_table',1),(21,'2024_08_15_144513_create_available_design_lang_table',1),(22,'2024_08_15_145549_add_category_id_and_content_type_id_to_available_design_table',1),(23,'2024_08_19_130047_create_jobs_table',1),(24,'2024_08_23_133310_create_contact_references_table',1),(25,'2024_08_23_133513_add_reserved_to_available_design_table',1),(26,'2024_08_23_134242_remove_reserved_from_available_designs',1),(27,'2024_09_09_101450_alter_site_setting_table',1),(28,'2024_09_09_101947_create_theme_table',1),(29,'2024_09_09_102124_add_theme_id_to_site_setting_table',1),(30,'2024_09_09_102539_create_site_setting_lang_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_type_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `active` tinyint DEFAULT '1',
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolio_content_type_id_foreign` (`content_type_id`),
  KEY `portfolio_category_id_foreign` (`category_id`),
  CONSTRAINT `portfolio_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `portfolio_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (1,1,1,1,'flores-olhos','2024-11-15 19:19:32','2025-04-19 17:21:21',NULL),(2,1,2,1,'flores-na-mão','2024-11-15 19:19:32','2025-04-16 16:52:32',NULL),(3,1,3,1,'galaxia','2024-11-15 19:19:32','2025-04-16 16:04:47',NULL),(4,1,1,1,'sanguelatino','2024-11-15 19:19:32','2025-04-17 15:32:59',NULL),(5,1,2,0,'raccoon','2024-11-15 19:19:32','2025-04-17 15:40:03',NULL),(6,1,3,1,'dafne','2025-04-16 16:45:47','2025-04-16 16:45:47',NULL),(7,1,5,1,'passarinhoaquarela','2025-04-16 16:51:11','2025-04-16 16:51:11',NULL),(8,1,5,1,'gato','2025-04-17 15:54:11','2025-04-17 15:54:11',NULL),(9,1,5,1,'esquilo','2025-04-17 16:07:55','2025-04-17 16:07:55',NULL),(10,1,2,1,'abstrataoisin','2025-04-17 16:12:51','2025-04-17 16:12:51',NULL),(11,1,6,1,'helenameireles','2025-04-17 16:29:34','2025-04-17 16:34:12',NULL);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_lang`
--

DROP TABLE IF EXISTS `portfolio_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `portfolio_id` bigint unsigned NOT NULL,
  `language_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `portfolio_lang_portfolio_id_foreign` (`portfolio_id`),
  KEY `portfolio_lang_language_id_foreign` (`language_id`),
  CONSTRAINT `portfolio_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  CONSTRAINT `portfolio_lang_portfolio_id_foreign` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_lang`
--

LOCK TABLES `portfolio_lang` WRITE;
/*!40000 ALTER TABLE `portfolio_lang` DISABLE KEYS */;
INSERT INTO `portfolio_lang` VALUES (1,1,1,'Olhos e Flores de Cecília','portfolio-1','<p>Este desenho foi criado para a Cecília, inspirado em uma lembrança marcante de sua infância — um gesto simples que ecoa até hoje em quem ela se tornou. Em um dia de visita à sua tia muito doente, que não podia sair de casa, Cecília colheu flores no jardim e as entregou a ela. Ao recebê-las, a tia disse: “Você me trouxe cores, Cecília.” Hoje, como designer, é isso que ela continua fazendo: levando cores e sensibilidade para a vida de muitas outras pessoas.</p>'),(2,2,1,'Flores e Olhos na mão','floreseolhosnamao-pt','<p>Serie Natura Malinconica</p>'),(3,3,1,'Galaxia','galaxia-pt','<p>Este desenho nasceu de uma troca profunda com Laura, que me trouxe reflexões sobre o tempo, o espaço e os caminhos invisíveis que conectam nossas histórias. A composição abstrata se inspira nos movimentos das galáxias — traços que orbitam, expandem e se dissolvem, como memórias que brilham no escuro. Uma tatuagem que pulsa com mistério, transformação e infinito.</p>'),(4,4,1,'Sangue Latino','sanguelatino-pt','<p>Essa tatuagem foi uma encomenda especial, onde meu cliente me pediu uma releitura da mitologia grega — o momento em que Hércules carrega o mundo nas costas. No desenho, misturo referências latino-americanas: o formato do rosto remete aos povos originários das Américas, e a cena evoca a imagem de uma Pachamama exausta, sustentando o peso do mundo. É um encontro simbólico entre mitos, culturas e forças ancestrais.</p>'),(5,5,1,'Guaxinim','guaxinim-pt','<p>Esse guaxinim faz parte de uma série de três que criei a partir da ideia de uma cliente. A maneira como construí esses animais acabou se transformando em um dos estilos que mais me identifico: composições gráficas com paleta reduzida, criadas a partir de recortes de desenhos feitos à mão. Você pode se inspirar nessa linguagem e transformar em algo que seja só seu — um animal, um gesto, um símbolo que carregue a sua história.</p>'),(6,1,2,'Gli occhi e i fiori di Cecilia','portfolio-1-it','<p>Questo disegno è stato creato per Cecilia, ispirato a un ricordo profondo della sua infanzia — un gesto semplice che ancora oggi riflette chi è diventata. Un giorno, durante una visita a sua zia molto malata, Cecilia raccolse dei fiori in giardino e glieli portò. La zia, commossa, le disse: “Mi hai portato dei colori, Cecilia.” Oggi, come designer, Cecilia continua a fare lo stesso: portare colori e delicatezza nella vita di tante persone</p>'),(7,2,2,'Fiori e Occhi in mano','serienaturamalinconica-it','<p>Serie Natura Malinconica</p>'),(8,3,2,'Galassia','galassia-it','<p>Questo disegno è nato da un dialogo profondo con Laura, che mi ha parlato del tempo, dello spazio e dei sentieri invisibili che collegano le nostre storie. La composizione astratta si ispira ai movimenti delle galassie — linee che orbitano, si espandono e si dissolvono come ricordi che brillano nel buio. Un tatuaggio che vibra di mistero, trasformazione e infinito.</p>'),(9,4,2,'Sangue Latino','sanguelatino-it','<p>Questo tatuaggio è stato una commissione speciale, in cui il mio cliente mi ha chiesto una rilettura della mitologia greca — il momento in cui Ercole porta il mondo sulle spalle. Nel disegno, ho mescolato riferimenti latinoamericani: la forma del volto richiama i popoli originari delle Americhe e la scena evoca l\'immagine di una Pachamama stanca, che sostiene il peso del mondo. È un incontro simbolico tra miti, culture e forze ancestrali.</p>'),(10,5,2,'Procione','raccoon-it','<p>Questo procione fa parte di una serie di tre che ho creato ispirandomi all’idea di una cliente. Il modo in cui ho costruito questi animali è diventato uno degli stili in cui mi riconosco di più: composizioni grafiche con una palette di colori ridotta, realizzate con ritagli di disegni fatti a mano. Puoi lasciarti ispirare da questo linguaggio visivo e trasformarlo in qualcosa di unico — un animale, un gesto, un simbolo che racconti la tua storia.</p>'),(11,1,3,'Cecilia\'s Eyes and Flowers','portfolio-1-en','<p>This design was created for Cecilia, inspired by a meaningful memory from her childhood — a simple gesture that still reflects who she is today. One day, while visiting a very ill aunt who could no longer go outside, Cecilia picked flowers from the garden and gave them to her. Touched, her aunt said: “You brought me colors, Cecilia.” Today, as a designer, she continues to do just that — bringing color and beauty into the lives of many others.</p>'),(12,2,3,'Flowers and Eyes in Hand','flowersandeyesinhand','<p>Malinconica Nature Series</p>'),(13,3,3,'Galaxy','galaxy-en','<p>This design was born from a deep exchange with Laura, who shared reflections on time, space, and the invisible paths that connect our stories. The abstract composition is inspired by galactic movements — lines that orbit, expand, and dissolve like memories glowing in the dark. A tattoo that resonates with mystery, transformation, and the infinite.</p>'),(14,4,3,'Sangue Latino','sanguelatino-en','<p>This tattoo was a special commission, where my client asked me for a reinterpretation of Greek mythology — the moment when Hercules carries the world on his back. In the drawing, I blend Latin American references: the shape of the face recalls the Indigenous peoples of the Americas, and the scene evokes the image of a weary Pachamama, bearing the weight of the world. It’s a symbolic encounter between myths, cultures, and ancestral forces.</p>'),(15,5,3,'Raccoon','raccoon-en','<p>This raccoon is part of a series of three I created, inspired by an idea from a client. The way I built these animals became one of the styles I feel most connected to: graphic compositions with a reduced color palette, made from cutouts of hand-drawn illustrations. You can take inspiration from this visual language and turn it into something uniquely yours — an animal, a gesture, a symbol that carries your story.</p>'),(16,6,1,'Dafne','dafne-pt','<p>Este projeto é inspirado no mito de Dafne, ninfa que, ao fugir de Apolo, se transforma em árvore para preservar sua liberdade. A tatuagem foi pensada para a perna, acompanhando o movimento natural do corpo enquanto representa esse momento de transição e resistência. O corpo se torna tronco, os gestos viram galhos — uma homenagem à força de se reinventar diante do inevitável.</p>'),(17,6,2,'Dafne','dafne-it','<p>Questo progetto si ispira al mito di Dafne, la ninfa che, fuggendo da Apollo, si trasforma in albero per preservare la propria libertà. Pensato per la gamba, il tatuaggio segue il movimento naturale del corpo, rappresentando un momento di trasformazione e resistenza. Il corpo diventa tronco, i gesti si fanno rami — un omaggio alla forza di reinventarsi davanti all’inevitabile.</p>'),(18,6,3,'Daphne','daphne-en','<p>This project is inspired by the myth of Daphne, the nymph who, fleeing Apollo, transforms into a tree to preserve her freedom. Designed for the leg, the tattoo follows the natural movement of the body while representing this moment of transformation and resistance. The body becomes trunk, gestures become branches — a tribute to the strength of reinventing oneself in the face of the inevitable.</p>'),(19,7,1,'Voo Turvo','vooturvo-pt','<p>Um pequeno pássaro em pleno voo, envolto por manchas caóticas de aquarela. A leveza da forma contrasta com a intensidade das cores, como se cada batida de asa carregasse sentimentos profundos. Essa composição expressiva fala sobre liberdade, confusão, sensibilidade — e o belo que nasce no meio do turbilhão.</p>'),(20,7,2,'Volo Offuscato','volooffuscato-it','<p>Un piccolo uccello in volo, avvolto da macchie caotiche d’acquarello. La leggerezza della forma contrasta con l’intensità dei colori, come se ogni battito d’ali portasse emozioni profonde. Questa composizione espressiva parla di libertà, confusione, sensibilità — e della bellezza che nasce nel mezzo del turbine.</p>'),(21,7,3,'Clouded Flight','cloudedflight-en','<p>A small bird in mid-flight, wrapped in chaotic watercolor stains. The lightness of its form contrasts with the intensity of the colors, as if every wingbeat carries deep emotion. This expressive composition speaks of freedom, confusion, sensitivity — and the beauty that emerges from the whirlwind.</p>'),(22,8,1,'Gatinho','gato-pt','<p>Uma tatuagem feita em homenagem ao gato de uma cliente, marcada por traços soltos e expressivos que capturam o afeto e a presença única do animal. Com tons fechados e uma composição colorida, a peça ocupa a coxa de forma intensa e poética. É uma celebração do vínculo entre eles, impressa na pele com liberdade e sentimento.</p>'),(23,8,2,'Gatto','gato-it','<p>Un tatuaggio realizzato in omaggio al gatto di una cliente, con tratti liberi ed espressivi che catturano l’affetto e la presenza unica dell’animale. Con toni scuri e una composizione colorata, l’opera si estende sulla coscia in modo intenso e poetico. È una celebrazione del loro legame, impressa sulla pelle con libertà e sentimento.</p>'),(24,8,3,'Cat','gato-en','<p>A tattoo was created in tribute to a client’s cat, with loose and expressive strokes that capture the affection and unique presence of the animal. Featuring deep tones and a vibrant composition, the piece unfolds across the thigh in an intense and poetic way. It\'s a celebration of their bond, etched onto the skin with freedom and emotion.</p>'),(25,9,1,'Esquilo','esquilo-pt','<p>Este esquilo faz parte da mesma linguagem visual que desenvolvi na série dos guaxinins — uma abordagem mais gráfica, com formas recortadas e paleta reduzida, inspirada em desenhos feitos à mão. A tatuagem foi criada para a perna, explorando o movimento do corpo e o dinamismo desse pequeno animal, que carrega energia e leveza.</p>'),(26,9,2,'Scoiattolo','scoiattolo-it','<p>Questo scoiattolo fa parte dello stesso linguaggio visivo che ho sviluppato nella serie dei procioni — un approccio più grafico, con forme ritagliate e una palette ridotta ispirata a disegni fatti a mano. Progettato per la gamba, il tatuaggio segue il movimento del corpo e cattura l’energia e la leggerezza di questa piccola creatura.</p>'),(27,9,3,'Squirrel','squirrel-en','<p>This squirrel belongs to the same visual language I explored in the raccoon series — a more graphic approach, with cut-out shapes and a reduced color palette inspired by handmade drawings. Designed for the leg, the tattoo plays with the body’s movement and captures the energy and lightness of this little creature.</p>'),(28,10,1,'Flor abstrata na perna','florabstrata-pt','<p>Uma flor abstrata desenhada diretamente sobre a pele, seguindo os contornos da perna em um processo intuitivo e orgânico. Essa tatuagem foi feita em freehand, permitindo que o desenho nascesse em diálogo com o corpo. A composição mistura formas fluidas e fragmentadas, como se a flor estivesse em movimento constante — um símbolo delicado de transformação e força.</p>'),(29,10,2,'Fiore Astratto','fioreastratto-it','<p>Un fiore astratto disegnato direttamente sulla pelle, seguendo i contorni naturali della gamba in un processo intuitivo e organico. Questo tatuaggio freehand è nato in dialogo diretto con il corpo, mescolando forme fluide e frammentate, come se il fiore fosse in movimento continuo — un simbolo delicato di trasformazione e forza.</p>'),(30,10,3,'Abstract Flower','abstractflower1-en','<p>An abstract flower drawn directly onto the skin, following the natural contours of the leg in an intuitive, organic process. This freehand tattoo emerged in direct dialogue with the body, blending fluid and fragmented shapes, as if the flower were in constant motion — a delicate symbol of transformation and strength.</p>'),(31,11,1,'Helena Meireles','helenameireles-pt','<p>Esta tatuagem foi inspirada na musicista violeira Helena Meireles, capturando a essência de sua arte. A imagem a mostra tocando sua viola, com um vestido adornado por texturas abstratas que representam o movimento da música. O desenho, feito no braço, traz uma conexão visual entre a música e a expressão corporal, celebrando o talento e a história de Helena.</p>'),(32,11,2,'Helena Meireles','helenameireles-it','<p>Questo tatuaggio è stato ispirato dalla musicista Helena Meireles, catturando l\'essenza della sua arte. L\'immagine la ritrae mentre suona la viola, con un abito decorato da texture astratte che rappresentano il movimento della musica. Il disegno, posizionato sul braccio, crea una connessione visiva tra la musica e l\'espressione corporea, celebrando il talento e la storia di Helena.</p>'),(33,11,3,'Helena Meireles','helenameireles-en','<p>This tattoo was inspired by the musician Helena Meireles, capturing the essence of her art. The image shows her playing the viola, with a dress adorned by abstract textures that represent the movement of music. The design, placed on the arm, creates a visual connection between music and bodily expression, celebrating Helena\'s talent and history.</p>');
/*!40000 ALTER TABLE `portfolio_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_setting`
--

DROP TABLE IF EXISTS `site_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_setting` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theme_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_setting_theme_id_foreign` (`theme_id`),
  CONSTRAINT `site_setting_theme_id_foreign` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_setting`
--

LOCK TABLES `site_setting` WRITE;
/*!40000 ALTER TABLE `site_setting` DISABLE KEYS */;
INSERT INTO `site_setting` VALUES (1,'default-conf',1);
/*!40000 ALTER TABLE `site_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_setting_lang`
--

DROP TABLE IF EXISTS `site_setting_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_setting_lang` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_setting_id` bigint unsigned NOT NULL,
  `language_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_setting_lang_site_setting_id_foreign` (`site_setting_id`),
  KEY `site_setting_lang_language_id_foreign` (`language_id`),
  CONSTRAINT `site_setting_lang_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  CONSTRAINT `site_setting_lang_site_setting_id_foreign` FOREIGN KEY (`site_setting_id`) REFERENCES `site_setting` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_setting_lang`
--

LOCK TABLES `site_setting_lang` WRITE;
/*!40000 ALTER TABLE `site_setting_lang` DISABLE KEYS */;
INSERT INTO `site_setting_lang` VALUES (1,1,1,'Solztt - Artista Tatuadora','Solztt - Artista Tatuadora','tatuagem, abstrato, figurativo, arte comtemporânea','artista-tatuadora'),(2,1,2,'Solztt - Tattoo Artist','Solztt - Tattoo Artist','tatuaggio, astratto, figurativo, arte contemporanea','solztt-tattoo-artist-it'),(3,1,3,'Solztt - Tattoo Artist','Solztt - Tattoo Artist','Tattoo, abstract, figurative, contemporary art','solztt-tattoo-artist-eng');
/*!40000 ALTER TABLE `site_setting_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social`
--

DROP TABLE IF EXISTS `social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social`
--

LOCK TABLES `social` WRITE;
/*!40000 ALTER TABLE `social` DISABLE KEYS */;
INSERT INTO `social` VALUES (1,'instagram','https://instagram.com/solztt'),(2,'facebook','https://www.facebook.com/solzztt');
/*!40000 ALTER TABLE `social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES (1,'Default theme','default','2024-11-15 19:19:32','2024-11-15 19:19:32'),(2,'Dark theme','dark-theme','2024-11-15 19:19:32','2024-11-15 19:19:32'),(3,'Light theme','light-theme','2024-11-15 19:19:32','2024-11-15 19:19:32');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Dev user','dev@soztt.com','2024-11-15 19:19:31','$2y$12$KYKi91f1clWJ0v9Ai1uFyOLodCQU2.nGuzJZy.nynbppwfGR1rsf2','qrnd5upJvd','2024-11-15 19:19:31','2024-11-15 19:19:31'),(2,'Sol','solztt.br@gmail.com','2024-11-15 19:19:31','$2y$12$ad0OdRe1Y/7XZdgWCfwM.uUT2QVFMKTIajq6g9vcA0PnbtDRpM5PS','Xp79M4xxaO','2024-11-15 19:19:32','2024-11-15 19:19:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 13:10:01
