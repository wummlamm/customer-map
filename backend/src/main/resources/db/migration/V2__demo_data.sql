-- Fiktive Demo-Firmen im Rheinland
insert into company (name, email)
values ('Rheinwerk Solutions GmbH', 'info@rheinwerk-solutions.example'),
       ('Domstadt Digital AG', 'kontakt@domstadt-digital.example'),
       ('Niederrhein Logistik KG', 'office@niederrhein-logistik.example');

insert into address (street, house_number, postal_code, city, latitude, longitude, company_id)
values ('Königsallee', '92', '40212', 'Düsseldorf', 51.2216, 6.7794,
        (select id from company where name = 'Rheinwerk Solutions GmbH')),
       ('Hohe Straße', '68', '50667', 'Köln', 50.9364, 6.9528,
        (select id from company where name = 'Domstadt Digital AG')),
       ('Ostwall', '15', '47798', 'Krefeld', 51.3331, 6.5645,
        (select id from company where name = 'Niederrhein Logistik KG'));
