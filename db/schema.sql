drop table if exists files;
drop table if exists folders;

create table folders (
    id serial primary key,
    name text not null unique
);

create table files (
    id serial primary key,
    name text not null,
    size integer not null,
    folder_id integer not null references folders(id) on delete cascade,
    unique (name, folder_id)
);