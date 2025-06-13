class CreateComparisons < ActiveRecord::Migration[8.0]
  def change
    create_table :comparisons do |t|
      t.string :name
      t.string :country1_iso
      t.string :country2_iso
      t.date :start_date
      t.date :end_date
      t.decimal :confirmed_variation
      t.decimal :deaths_variation
      t.decimal :recovered_variation
      t.decimal :fatality_variation
      t.integer :trend_index

      t.timestamps
    end
  end
end
