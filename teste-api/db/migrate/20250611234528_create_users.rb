class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :nome, null: false
      t.string :usuario, null: false
      t.string :password_digest, null: false
      t.string :role, null: false 

      t.timestamps
    end
    add_index :users, :usuario, unique: true
  end
end
