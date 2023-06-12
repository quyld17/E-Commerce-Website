DROP TABLE IF EXISTS user;
CREATE TABLE user (
    user_id INT AUTO_INCREMENT NOT NULL,
    name CHAR(30),
    date_of_birth DATETIME,
    phone_number CHAR(11), 
    address VARCHAR(255),
    gender TINYINT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at datetime NOT NULL,
    PRIMARY KEY (`user_id`)
);