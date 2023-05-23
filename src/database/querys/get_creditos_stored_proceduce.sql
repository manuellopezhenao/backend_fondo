DROP PROCEDURE IF EXISTS GetCreditos;
CREATE PROCEDURE GetCreditos
    @id_user VARCHAR(255)
AS
BEGIN

	Declare @cedula int;

	IF NOT EXISTS(SELECT TOP 1 cedula FROM users WHERE id_user = @id_user)
    BEGIN
        SELECT 'Usuario No Existe' AS error
        RETURN
    END

	SELECT @cedula = cedula FROM users WHERE id_user = @id_user;

SELECT
    codlinea as linea,
    pagare,
    capital as valorPrestamo,
	saldocapital as ValorRestante,
    anualidad as cuota,
    F_iniciofinanciacion as fecha,
    CASE WHEN cuotasmora <= 0 THEN 0 ELSE saldoponersedia END as valorMora,
    cuotasmora as cuotasEnMora,
   ROUND((1 - (saldocapital / (capital))) * 100, 2) as porcentajePago
FROM 
    creditos
WHERE 
    cedulasociado = @cedula 
    and saldocapital > 0;
END;