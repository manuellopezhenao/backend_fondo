DROP PROCEDURE IF EXISTS CheckUser;

CREATE PROCEDURE CheckUser
    @username VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN

    IF NOT EXISTS(SELECT TOP 1 * FROM users WHERE cedula = @username)
    BEGIN
        SELECT 'Usuario No Existe' AS error
        RETURN
    END

    IF NOT EXISTS
            (SELECT TOP 1 *
             FROM asociados
             WHERE cedulasociado = @username
                 AND estado = 'A')
    BEGIN
        SELECT 'Usuario Desactivado' AS error
        RETURN
    END



    -- Verificar si el username existe
    IF EXISTS(SELECT TOP 1 * FROM users WHERE cedula = @username AND password = @password)
    BEGIN
        -- Si el username existe, devolver la información del username
        SELECT TOP 1 * FROM users WHERE cedula = @username AND password = @password
    END
    ELSE
    BEGIN
        -- Si el username no existe, devolver un mensaje de error
        SELECT 'Usuario Y Contraseña Incorrectos' AS error
    END
END
