-- CreateTable
CREATE TABLE "public"."Tasks" (
    "taskId" SERIAL NOT NULL,
    "taskName" VARCHAR(20) NOT NULL,
    "taskDescription" VARCHAR(250),
    "taskPinned" BOOLEAN DEFAULT false,
    "taskPriority" INTEGER DEFAULT 10,
    "taskCreation" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "taskStart" TIMESTAMP(6) NOT NULL,
    "taskFinish" TIMESTAMP(6),
    "progressMax" BIGINT,
    "progress" DECIMAL,
    "taskAccomplished" TIMESTAMP(6),
    "lastProgress" TIMESTAMP(6),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "userId" SERIAL NOT NULL,
    "userName" VARCHAR(30) NOT NULL,
    "userEmail" VARCHAR(30) NOT NULL,
    "userPhone" VARCHAR(30) NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userCreation" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."ErrorLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stackTrace" TEXT,
    "metadata" JSONB,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userEmail" ON "public"."Users"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "userPhone" ON "public"."Users"("userPhone");

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
