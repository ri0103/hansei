class Deleteindex < ActiveRecord::Migration[6.1]
  def change
     remove_index :posts, :user_id
  end
end
