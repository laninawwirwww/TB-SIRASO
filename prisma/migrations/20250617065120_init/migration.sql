-- RedefineIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;

-- RedefineIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
DROP INDEX `User_username_key` ON `user`;
