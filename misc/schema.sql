-- docs

-- pk == PRIMARY KEY
-- uq == UNIQUE
-- fk == FK
-- df == DEFAULT KEY
--seq_nameoftable === sequence

-- table users

CREATE SEQUENCE seq_users;
CREATE TABLE users (
    id INT NOT NULL
        CONSTRAINT pk_users
        PRIMARY KEY DEFAULT nextval('seq_users'),

    primary_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
);
