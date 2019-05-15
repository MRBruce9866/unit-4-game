function Character(name, hp, mana, att, def, mAtt, mDef, img, portrait) {

    //String
    this.name = name;

    // Number
    this.health = hp;
    this.mana = mana;
    this.attack = att;
    this.defense = def;
    this.magicAttack = mAtt;
    this.magicDefense = mDef;

    //String (path)
    this.img = img;
    this.portrait = portrait;
}