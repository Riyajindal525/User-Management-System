- Table create
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    age INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GAME TABLE CREATE
CREATE TABLE game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    release_year INT,
    rating DECIMAL(3,1), -- Example: 8.5
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT SAMPLE DATA
INSERT INTO game (name, genre, release_year, rating) VALUES
('The Legend of Zelda: Breath of the Wild', 'Adventure', 2017, 9.7),
('Grand Theft Auto V', 'Action', 2013, 9.5),
('Minecraft', 'Sandbox', 2011, 9.0),
('Fortnite', 'Battle Royale', 2017, 8.3),
('Call of Duty: Modern Warfare', 'Shooter', 2019, 8.7),
('Elden Ring', 'RPG', 2022, 9.6),
('PUBG: Battlegrounds', 'Battle Royale', 2017, 8.1);


