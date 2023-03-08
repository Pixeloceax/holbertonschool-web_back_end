SELECT m.origin, COUNT(*) AS fan_count
FROM metal_bands m
INNER JOIN metal_band_fans f ON m.id = f.band_id
GROUP BY m.origin
ORDER BY fan_count DESC;
