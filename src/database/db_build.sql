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
    info VARCHAR(255) NOT NULL
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

insert into organizations (name, phone_number, address, info) values ('al-basma', '+972 04 6450765', 'Paulaus HaShishi 10', 'Donate NOW NIGGAS');
insert into organizations (name, phone_number, address, info) values ('al-basma', '+972 04 6450765', 'Paulaus HaShishi 10', 'Donate NOW NIGGAS');
insert into organizations (name, phone_number, address, info) values ('al-basma', '+972 04 6450765', 'Paulaus HaShishi 10', 'Donate NOW NIGGAS');
insert into organizations (name, phone_number, address, info) values ('al-basma', '+972 04 6450765', 'Paulaus HaShishi 10', 'Donate NOW NIGGAS');



COMMIT;
