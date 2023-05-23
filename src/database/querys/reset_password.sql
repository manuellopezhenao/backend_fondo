DROP PROCEDURE IF EXISTS ResetPassword;

CREATE PROCEDURE ResetPassword
    @cedula VARCHAR(255),
    @password VARCHAR(255),
    @code VARCHAR(255),
    @date DATETIME
AS
BEGIN

    -- Verificar que el usuario existe
    IF NOT EXISTS(SELECT TOP 1 cedula FROM users WHERE cedula = @cedula)
    BEGIN
        SELECT 'Usuario No Existe' AS error
        RETURN
    END

    -- Verificar que el código de reseteo de contraseña es correcto
    IF NOT EXISTS(SELECT TOP 1 cedula FROM users WHERE cedula = @cedula AND code_reset_password = @code)
    BEGIN
        SELECT 'Codigo Incorrecto' AS error
        RETURN
    END

    -- Verificar que no han pasado más de 5 minutos desde que se creó el código
    DECLARE @expires DATETIME
    SELECT @expires = code_reset_password_expires FROM users WHERE cedula = @cedula AND code_reset_password = @code
    IF DATEDIFF(MINUTE, @expires, @date) > 5
    BEGIN
        SELECT 'El código ha expirado' AS error
        RETURN
    END

    -- Actualizar la contraseña
    UPDATE users SET password = @password WHERE cedula = @cedula

    -- Eliminar el código de reseteo de contraseña
    UPDATE users SET code_reset_password = NULL, code_reset_password_expires = NULL WHERE cedula = @cedula

    SELECT 'Contraseña Actualizada' AS message
END

