// Code generated by ent, DO NOT EDIT.

package ent

import (
	"time"
)

// CreateBlockInput represents a mutation input for creating blocks.
type CreateBlockInput struct {
	AuthorID *string
	Speed    *float64
	Speaker  *string
	Volume   *float64
	Pitch    *int
	Texts    *string
	Duration *int
	PartID   string
}

// Mutate applies the CreateBlockInput on the BlockMutation builder.
func (i *CreateBlockInput) Mutate(m *BlockMutation) {
	if v := i.AuthorID; v != nil {
		m.SetAuthorID(*v)
	}
	if v := i.Speed; v != nil {
		m.SetSpeed(*v)
	}
	if v := i.Speaker; v != nil {
		m.SetSpeaker(*v)
	}
	if v := i.Volume; v != nil {
		m.SetVolume(*v)
	}
	if v := i.Pitch; v != nil {
		m.SetPitch(*v)
	}
	if v := i.Texts; v != nil {
		m.SetTexts(*v)
	}
	if v := i.Duration; v != nil {
		m.SetDuration(*v)
	}
	m.SetPartID(i.PartID)
}

// SetInput applies the change-set in the CreateBlockInput on the BlockCreate builder.
func (c *BlockCreate) SetInput(i CreateBlockInput) *BlockCreate {
	i.Mutate(c.Mutation())
	return c
}

// UpdateBlockInput represents a mutation input for updating blocks.
type UpdateBlockInput struct {
	AuthorID *string
	Speed    *float64
	Speaker  *string
	Volume   *float64
	Pitch    *int
	Texts    *string
	Duration *int
	PartID   *string
}

// Mutate applies the UpdateBlockInput on the BlockMutation builder.
func (i *UpdateBlockInput) Mutate(m *BlockMutation) {
	if v := i.AuthorID; v != nil {
		m.SetAuthorID(*v)
	}
	if v := i.Speed; v != nil {
		m.SetSpeed(*v)
	}
	if v := i.Speaker; v != nil {
		m.SetSpeaker(*v)
	}
	if v := i.Volume; v != nil {
		m.SetVolume(*v)
	}
	if v := i.Pitch; v != nil {
		m.SetPitch(*v)
	}
	if v := i.Texts; v != nil {
		m.SetTexts(*v)
	}
	if v := i.Duration; v != nil {
		m.SetDuration(*v)
	}
	if v := i.PartID; v != nil {
		m.SetPartID(*v)
	}
}

// SetInput applies the change-set in the UpdateBlockInput on the BlockUpdate builder.
func (c *BlockUpdate) SetInput(i UpdateBlockInput) *BlockUpdate {
	i.Mutate(c.Mutation())
	return c
}

// SetInput applies the change-set in the UpdateBlockInput on the BlockUpdateOne builder.
func (c *BlockUpdateOne) SetInput(i UpdateBlockInput) *BlockUpdateOne {
	i.Mutate(c.Mutation())
	return c
}

// CreatePartInput represents a mutation input for creating parts.
type CreatePartInput struct {
	Name      string
	AuthorID  string
	CreatedAt *time.Time
	WorkID    string
	BlockIDs  []string
}

// Mutate applies the CreatePartInput on the PartMutation builder.
func (i *CreatePartInput) Mutate(m *PartMutation) {
	m.SetName(i.Name)
	m.SetAuthorID(i.AuthorID)
	if v := i.CreatedAt; v != nil {
		m.SetCreatedAt(*v)
	}
	m.SetWorkID(i.WorkID)
	if v := i.BlockIDs; len(v) > 0 {
		m.AddBlockIDs(v...)
	}
}

// SetInput applies the change-set in the CreatePartInput on the PartCreate builder.
func (c *PartCreate) SetInput(i CreatePartInput) *PartCreate {
	i.Mutate(c.Mutation())
	return c
}

// UpdatePartInput represents a mutation input for updating parts.
type UpdatePartInput struct {
	Name           *string
	AuthorID       *string
	WorkID         *string
	ClearBlocks    bool
	AddBlockIDs    []string
	RemoveBlockIDs []string
}

// Mutate applies the UpdatePartInput on the PartMutation builder.
func (i *UpdatePartInput) Mutate(m *PartMutation) {
	if v := i.Name; v != nil {
		m.SetName(*v)
	}
	if v := i.AuthorID; v != nil {
		m.SetAuthorID(*v)
	}
	if v := i.WorkID; v != nil {
		m.SetWorkID(*v)
	}
	if i.ClearBlocks {
		m.ClearBlocks()
	}
	if v := i.AddBlockIDs; len(v) > 0 {
		m.AddBlockIDs(v...)
	}
	if v := i.RemoveBlockIDs; len(v) > 0 {
		m.RemoveBlockIDs(v...)
	}
}

// SetInput applies the change-set in the UpdatePartInput on the PartUpdate builder.
func (c *PartUpdate) SetInput(i UpdatePartInput) *PartUpdate {
	i.Mutate(c.Mutation())
	return c
}

// SetInput applies the change-set in the UpdatePartInput on the PartUpdateOne builder.
func (c *PartUpdateOne) SetInput(i UpdatePartInput) *PartUpdateOne {
	i.Mutate(c.Mutation())
	return c
}

// CreateUserInput represents a mutation input for creating users.
type CreateUserInput struct {
	GoogleID string
	StripeID *string
	Point    *int
	WorkIDs  []string
}

// Mutate applies the CreateUserInput on the UserMutation builder.
func (i *CreateUserInput) Mutate(m *UserMutation) {
	m.SetGoogleID(i.GoogleID)
	if v := i.StripeID; v != nil {
		m.SetStripeID(*v)
	}
	if v := i.Point; v != nil {
		m.SetPoint(*v)
	}
	if v := i.WorkIDs; len(v) > 0 {
		m.AddWorkIDs(v...)
	}
}

// SetInput applies the change-set in the CreateUserInput on the UserCreate builder.
func (c *UserCreate) SetInput(i CreateUserInput) *UserCreate {
	i.Mutate(c.Mutation())
	return c
}

// UpdateUserInput represents a mutation input for updating users.
type UpdateUserInput struct {
	GoogleID      *string
	StripeID      *string
	Point         *int
	ClearWorks    bool
	AddWorkIDs    []string
	RemoveWorkIDs []string
}

// Mutate applies the UpdateUserInput on the UserMutation builder.
func (i *UpdateUserInput) Mutate(m *UserMutation) {
	if v := i.GoogleID; v != nil {
		m.SetGoogleID(*v)
	}
	if v := i.StripeID; v != nil {
		m.SetStripeID(*v)
	}
	if v := i.Point; v != nil {
		m.SetPoint(*v)
	}
	if i.ClearWorks {
		m.ClearWorks()
	}
	if v := i.AddWorkIDs; len(v) > 0 {
		m.AddWorkIDs(v...)
	}
	if v := i.RemoveWorkIDs; len(v) > 0 {
		m.RemoveWorkIDs(v...)
	}
}

// SetInput applies the change-set in the UpdateUserInput on the UserUpdate builder.
func (c *UserUpdate) SetInput(i UpdateUserInput) *UserUpdate {
	i.Mutate(c.Mutation())
	return c
}

// SetInput applies the change-set in the UpdateUserInput on the UserUpdateOne builder.
func (c *UserUpdateOne) SetInput(i UpdateUserInput) *UserUpdateOne {
	i.Mutate(c.Mutation())
	return c
}

// CreateWorkInput represents a mutation input for creating works.
type CreateWorkInput struct {
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
	AuthorID  string
	PartIDs   []string
}

// Mutate applies the CreateWorkInput on the WorkMutation builder.
func (i *CreateWorkInput) Mutate(m *WorkMutation) {
	m.SetName(i.Name)
	m.SetCreatedAt(i.CreatedAt)
	m.SetUpdatedAt(i.UpdatedAt)
	m.SetAuthorID(i.AuthorID)
	if v := i.PartIDs; len(v) > 0 {
		m.AddPartIDs(v...)
	}
}

// SetInput applies the change-set in the CreateWorkInput on the WorkCreate builder.
func (c *WorkCreate) SetInput(i CreateWorkInput) *WorkCreate {
	i.Mutate(c.Mutation())
	return c
}

// UpdateWorkInput represents a mutation input for updating works.
type UpdateWorkInput struct {
	Name          *string
	CreatedAt     *time.Time
	UpdatedAt     *time.Time
	AuthorID      *string
	ClearParts    bool
	AddPartIDs    []string
	RemovePartIDs []string
}

// Mutate applies the UpdateWorkInput on the WorkMutation builder.
func (i *UpdateWorkInput) Mutate(m *WorkMutation) {
	if v := i.Name; v != nil {
		m.SetName(*v)
	}
	if v := i.CreatedAt; v != nil {
		m.SetCreatedAt(*v)
	}
	if v := i.UpdatedAt; v != nil {
		m.SetUpdatedAt(*v)
	}
	if v := i.AuthorID; v != nil {
		m.SetAuthorID(*v)
	}
	if i.ClearParts {
		m.ClearParts()
	}
	if v := i.AddPartIDs; len(v) > 0 {
		m.AddPartIDs(v...)
	}
	if v := i.RemovePartIDs; len(v) > 0 {
		m.RemovePartIDs(v...)
	}
}

// SetInput applies the change-set in the UpdateWorkInput on the WorkUpdate builder.
func (c *WorkUpdate) SetInput(i UpdateWorkInput) *WorkUpdate {
	i.Mutate(c.Mutation())
	return c
}

// SetInput applies the change-set in the UpdateWorkInput on the WorkUpdateOne builder.
func (c *WorkUpdateOne) SetInput(i UpdateWorkInput) *WorkUpdateOne {
	i.Mutate(c.Mutation())
	return c
}
