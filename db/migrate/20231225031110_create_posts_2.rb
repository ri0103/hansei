class CreatePosts2 < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.references :user
      t.string :content
      t.string :feedback
      t.integer :likes
      t.timestamps null: false
    end
  end
end
