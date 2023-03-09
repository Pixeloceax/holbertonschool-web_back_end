-- Name: 2-fans.sql
-- comment
SELECT m.origin, COUNT(*) AS nb_fans
FROM metal_bands m
INNER JOIN metal_band_fans f ON m.id = f.band_id
GROUP BY m.origin
ORDER BY nb_fans DESC;
