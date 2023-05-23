CREATE PROCEDURE GetNovedades (@id_user VARCHAR(255))
AS
BEGIN

     Declare @cedula int;

	IF NOT EXISTS(SELECT TOP 1 cedula FROM users WHERE id_user = @id_user)
    BEGIN
        SELECT 'Usuario No Existe' AS error
        RETURN
    END

	SELECT @cedula = cedula FROM users WHERE id_user = @id_user;

	print(@cedula)

    EXEC ConsultaNovedadesAsociadoPuntoAtencion @cedula
END
