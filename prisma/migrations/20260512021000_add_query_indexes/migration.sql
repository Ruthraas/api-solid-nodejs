-- CreateIndex
CREATE INDEX "check_ins_user_id_created_at_idx" ON "check_ins"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "check_ins_gym_id_idx" ON "check_ins"("gym_id");

-- CreateIndex
CREATE INDEX "gyms_title_idx" ON "gyms"("title");

-- CreateIndex
CREATE INDEX "gyms_latitude_longitude_idx" ON "gyms"("latitude", "longitude");
