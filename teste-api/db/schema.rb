# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_06_12_230724) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "comparisons", force: :cascade do |t|
    t.string "name"
    t.string "country1_iso"
    t.string "country2_iso"
    t.date "start_date"
    t.date "end_date"
    t.decimal "confirmed_variation"
    t.decimal "deaths_variation"
    t.decimal "recovered_variation"
    t.decimal "fatality_variation"
    t.integer "trend_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", force: :cascade do |t|
    t.string "name", null: false
    t.string "iso", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["iso"], name: "index_countries_on_iso", unique: true
  end

  create_table "results", force: :cascade do |t|
    t.bigint "comparison_id", null: false
    t.string "iso"
    t.date "date"
    t.integer "confirmed"
    t.integer "confirmed_diff"
    t.integer "deaths"
    t.integer "deaths_diff"
    t.integer "recovered"
    t.integer "recovered_diff"
    t.integer "active"
    t.integer "active_diff"
    t.decimal "fatality_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comparison_id"], name: "index_results_on_comparison_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "nome", null: false
    t.string "usuario", null: false
    t.string "password_digest", null: false
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["usuario"], name: "index_users_on_usuario", unique: true
  end

  add_foreign_key "results", "comparisons"
end
