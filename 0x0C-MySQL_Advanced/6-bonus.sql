-- Create a stored procedure AddBonus that takes 3 parameters: user_id, project_name, score
DELIMITER $$
CREATE PROCEDURE AddBonus ( user_id INTEGER, project_name VARCHAR(255), score INTEGER)
BEGIN
    INSERT INTO project(name) SELECT project_name FROM DUAL
    WHERE NOT EXISTS (SELECT * FROM project WHERE name = project_name);

    INSERT INTO user_project(user_id, project_id, score)
END $$
DELIMITER ;