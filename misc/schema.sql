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

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_users_utc_created_onn DEFAULT(now())
);
ALTER SEQUENCE seq_users OWNED BY users.id;
