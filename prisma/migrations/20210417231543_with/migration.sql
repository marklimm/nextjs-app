-- CreateTable
CREATE TABLE "_CharacterToCharacterTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "CharacterTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToCharacterTag_AB_unique" ON "_CharacterToCharacterTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToCharacterTag_B_index" ON "_CharacterToCharacterTag"("B");
