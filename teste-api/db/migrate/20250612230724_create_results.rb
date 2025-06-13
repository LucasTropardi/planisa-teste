class CreateResults < ActiveRecord::Migration[8.0]
  def change
    create_table :results do |t|
      t.references :comparison, null: false, foreign_key: true
      t.string :iso
      t.date :date
      t.integer :confirmed
      t.integer :confirmed_diff
      t.integer :deaths
      t.integer :deaths_diff
      t.integer :recovered
      t.integer :recovered_diff
      t.integer :active
      t.integer :active_diff
      t.decimal :fatality_rate

      t.timestamps
    end
  end
end
