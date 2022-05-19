resource "aws_db_subnet_group" "group2_db_subnet_group" {
  name       = var.rds_subnet_group_name
  subnet_ids = [var.rds_subnet_id_1, var.rds_subnet_id_2]
  tags       = var.rds_subnet_group_tags
}