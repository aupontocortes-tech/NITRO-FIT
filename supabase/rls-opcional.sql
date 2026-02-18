-- Row Level Security (RLS) - OPCIONAL
-- Use este arquivo se o app acessar as tabelas pelo cliente Supabase (anon key) no frontend.
-- No Supabase: SQL Editor > colar e executar.
--
-- Se o app usar APENAS Prisma no servidor, você não precisa rodar este script.

-- Ativar RLS em todas as tabelas
ALTER TABLE planos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cobrancas ENABLE ROW LEVEL SECURITY;
ALTER TABLE treinos ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracao_cobranca ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE atividades ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir tudo para anon (ajuste depois se tiver login por usuário)
-- Assim o frontend com anon key pode ler/escrever. Para produção, restrinja por auth.uid().

CREATE POLICY "anon all planos" ON planos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all alunos" ON alunos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all contratos" ON contratos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all pagamentos" ON pagamentos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all cobrancas" ON cobrancas FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all treinos" ON treinos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all exercicios" ON exercicios FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all agendamentos" ON agendamentos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all configuracao_cobranca" ON configuracao_cobranca FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all usuarios" ON usuarios FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon all atividades" ON atividades FOR ALL TO anon USING (true) WITH CHECK (true);
