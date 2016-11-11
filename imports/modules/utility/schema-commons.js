export const SchemaCommons = {
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();
    },
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnUpdate: new Date() };
      }
    },
    denyInsert: true,
    optional: true,
  },
};
