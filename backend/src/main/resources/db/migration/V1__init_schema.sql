create table company
(
    id    bigserial primary key,
    name  varchar(255) not null,
    email varchar(255)
);

create table address
(
    id           bigserial primary key,
    street       varchar(255)     not null,
    house_number varchar(20)      not null,
    postal_code  varchar(10)      not null,
    city         varchar(255)     not null,
    latitude     double precision not null,
    longitude    double precision not null,
    company_id   bigint           not null references company (id) on delete cascade
);
