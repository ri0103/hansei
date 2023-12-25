class CreateDislike < ActiveRecord::Migration[6.1]
  def change
      create_table :dislikes do |t|
        t.integer :user_id
        t.integer :post_id
        t.timestamps null: false
      end
  end
end
