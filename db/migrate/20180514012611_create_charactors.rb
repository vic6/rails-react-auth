class CreateCharactors < ActiveRecord::Migration[5.1]
  def change
    create_table :charactors do |t|
      t.string :name
      t.string :description
      t.belongs_to :user

      t.timestamps
    end
  end
end
