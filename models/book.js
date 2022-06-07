module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      authors: DataTypes.STRING,
      categories: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      description: DataTypes.TEXT,
      published_year: DataTypes.INTEGER,
      average_rating: DataTypes.DECIMAL,
      num_pages: DataTypes.INTEGER,
      ratings_count: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    });
  
    Book.associate = function(models) {
      Book.belongsToMany(models.Shoppingcart, { through: 'Shoppingcart_Book' }); 
      Book.belongsToMany(models.Purchase, { through: 'Purchase_Book' });
    };
  
    return Book;
  };
  