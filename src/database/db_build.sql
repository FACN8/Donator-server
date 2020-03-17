BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS donations CASCADE;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE organizations (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    info VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    fb_url VARCHAR(255) NOT NULL
);

CREATE TABLE donations (
    ID SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    org_id INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    info VARCHAR(255) NOT NULL,
    delivery VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(ID),
    FOREIGN KEY (org_id) REFERENCES organizations(ID)
);

insert into organizations (name, phone_number, address, info,img_url,fb_url) values ('Al-Basma Organization', '04-645-6422', 'Nazareth Municipality', 'A social charity registered since 1992, which was established on the initiative of a group of volunteers and the Social Welfare Department in the municipality of Nazareth.','https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-9/580722_412888635390524_1033643914_n.jpg?_nc_ohc=pa57ArpawoAAX_yGEew&_nc_ht=scontent.fhfa2-2.fna&oh=8067a51c990f5677fb94c40e9c1fe21f&oe=5E9641EF','https://www.facebook.com/جمعية-البسمة-الناصرة-411911428821578/');
insert into organizations (name, phone_number, address, info,img_url,fb_url) values ('Al-Basma2 Organization', '04-645-6422', 'Nazareth Municipality', 'A social charity registered since 1992, which was established on the initiative of a group of volunteers and the Social Welfare Department in the municipality of Nazareth.','https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-9/580722_412888635390524_1033643914_n.jpg?_nc_ohc=pa57ArpawoAAX_yGEew&_nc_ht=scontent.fhfa2-2.fna&oh=8067a51c990f5677fb94c40e9c1fe21f&oe=5E9641EF','https://www.facebook.com/جمعية-البسمة-الناصرة-411911428821578/');
insert into organizations (name, phone_number, address, info,img_url,fb_url) values ('Al-Basma3 Organization', '04-645-6422', 'Nazareth Municipality', 'A social charity registered since 1992, which was established on the initiative of a group of volunteers and the Social Welfare Department in the municipality of Nazareth.','https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-9/580722_412888635390524_1033643914_n.jpg?_nc_ohc=pa57ArpawoAAX_yGEew&_nc_ht=scontent.fhfa2-2.fna&oh=8067a51c990f5677fb94c40e9c1fe21f&oe=5E9641EF','https://www.facebook.com/جمعية-البسمة-الناصرة-411911428821578/');
insert into organizations (name, phone_number, address, info,img_url,fb_url) values ('Al-Basma4 Organization', '04-645-6422', 'Nazareth Municipality', 'A social charity registered since 1992, which was established on the initiative of a group of volunteers and the Social Welfare Department in the municipality of Nazareth.','https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-9/580722_412888635390524_1033643914_n.jpg?_nc_ohc=pa57ArpawoAAX_yGEew&_nc_ht=scontent.fhfa2-2.fna&oh=8067a51c990f5677fb94c40e9c1fe21f&oe=5E9641EF','https://www.facebook.com/جمعية-البسمة-الناصرة-411911428821578/');



COMMIT;
