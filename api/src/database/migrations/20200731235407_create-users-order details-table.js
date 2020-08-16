exports.up = function(knex) {
  return knex.schema.createTable('order_details', function(table) {
    table.increments('id');
    table.string('cpf');
    table.string('purchase_code');
    table.string('product_name');
    table.string('product_price');
    table.string('units');
    table.string('tracking_code');
    table.string('delivery_address');
    table.text('fiscal_note_pdf_64');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};


exports.down = function(knex) {
  return knex.schema.dropTable('order_details');
};
