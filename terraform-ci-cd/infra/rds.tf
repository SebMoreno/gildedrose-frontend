resource "aws_db_instance" "app_db" {
  identifier             = var.rds_identifier
  engine                 = var.rds_engine
  instance_class         = var.rds_instance_class
  name                   = var.rds_name
  username               = var.rds_username
  password               = var.rds_password
  allocated_storage      = var.rds_allocated_storage
  skip_final_snapshot    = var.rds_skip_final_snapshot
  tags                   = var.rds_tags
  db_subnet_group_name   = aws_db_subnet_group.group2_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.db_rds_sg.id]
}